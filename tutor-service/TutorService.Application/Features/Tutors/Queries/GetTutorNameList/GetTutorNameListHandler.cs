using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorNameList
{
    public class GetTutorNameListHandler : IRequestHandler<GetTutorNameList, (IEnumerable<ValidationFailure> errors,
        IEnumerable<string> nameList)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<GetTutorNameList> _validator;

        public GetTutorNameListHandler(ITutorsRepository tutorsRepository, IValidator<GetTutorNameList> validator)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }

        public async Task<(IEnumerable<ValidationFailure> errors, IEnumerable<string> nameList)> Handle(
            GetTutorNameList request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            return (null, await _tutorsRepository.NameListAsync(request.Query, cancellationToken));
        }
    }
}