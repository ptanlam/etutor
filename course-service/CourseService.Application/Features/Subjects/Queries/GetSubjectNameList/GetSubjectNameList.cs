using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectNameList
{
    public class GetSubjectNameList : IRequest<(IEnumerable<ValidationFailure> errors, IEnumerable<string> nameList)>
    {
        public string Query { get; init; }
    }
}