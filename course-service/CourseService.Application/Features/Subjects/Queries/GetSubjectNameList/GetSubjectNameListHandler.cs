using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectNameList
{
    public class GetSubjectNameListHandler : IRequestHandler<GetSubjectNameList, (IEnumerable<ValidationFailure> errors,
        IEnumerable<string> nameList)>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IValidator<GetSubjectNameList> _validator;

        public GetSubjectNameListHandler(ISubjectsRepository subjectsRepository,
            IValidator<GetSubjectNameList> validator)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }

        public async Task<(IEnumerable<ValidationFailure> errors, IEnumerable<string> nameList)> Handle(
            GetSubjectNameList request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            return (null, await _subjectsRepository.NameListAsync(request.Query, cancellationToken));
        }
    }
}