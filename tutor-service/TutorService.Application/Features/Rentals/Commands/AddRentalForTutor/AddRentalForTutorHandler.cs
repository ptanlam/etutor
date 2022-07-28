using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Rentals.ViewModels;
using TutorService.Domain.TutorAggregate;
using TutorService.Domain.ValueObjects;

namespace TutorService.Application.Features.Rentals.Commands.AddRentalForTutor
{
    public class AddRentalForTutorHandler : IRequestHandler<AddRentalForTutor,
        (IEnumerable<ValidationFailure> errors, RentalVm rental)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<AddRentalForTutor> _validator;
        private readonly IMapper _mapper;
        private readonly IMessagingService _messagingService;

        public AddRentalForTutorHandler(ITutorsRepository tutorsRepository, IValidator<AddRentalForTutor> validator,
            IMapper mapper, IMessagingService messagingService)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
        }

        public async Task<(IEnumerable<ValidationFailure> errors, RentalVm rental)> Handle(AddRentalForTutor request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var rental = new Rental(new Money(request.Amount, request.Unit));
            request.Tutor.AddRental(rental);

            await _tutorsRepository.UpdateAsync(request.Tutor);

            await _messagingService.AddNotificationForTutor(request.Tutor.UserId, "Rental Update",
                $"Your rental has been updated to {rental.Cost.Amount} {rental.Cost.Unit}");

            return (null, _mapper.Map<RentalVm>(rental));
        }
    }
}