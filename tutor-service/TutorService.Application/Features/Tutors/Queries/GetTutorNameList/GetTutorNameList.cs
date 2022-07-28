using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorNameList
{
    public class GetTutorNameList : IRequest<(IEnumerable<ValidationFailure> errors, IEnumerable<string> nameList)>
    {
        public string Query { get; init; }
    }
}