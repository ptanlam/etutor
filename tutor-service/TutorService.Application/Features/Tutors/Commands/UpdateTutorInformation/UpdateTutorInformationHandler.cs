using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Tutors.ViewModels;

namespace TutorService.Application.Features.Tutors.Commands.UpdateTutorInformation
{
    public class UpdateTutorInformationHandler : IRequestHandler<UpdateTutorInformation, 
        (List<ValidationFailure> errors, TutorDetailsVm tutor)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<UpdateTutorInformation> _validator;
        private readonly IMapper _mapper;

        public UpdateTutorInformationHandler(ITutorsRepository tutorsRepository,
            IValidator<UpdateTutorInformation> validator, IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, TutorDetailsVm tutor)> Handle(UpdateTutorInformation request,
            CancellationToken cancellationToken)
        {
            var validator = new UpdateTutorInformationValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            request.Tutor.UpdateDescription(request.Description);

            await _tutorsRepository.UpdateAsync(request.Tutor);
            return (validationResult.Errors, _mapper.Map<TutorDetailsVm>(request.Tutor));
        }
    }
}