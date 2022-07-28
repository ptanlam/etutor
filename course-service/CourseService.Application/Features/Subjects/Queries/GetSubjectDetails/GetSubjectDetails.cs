using System;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectDetails
{
    public class GetSubjectDetails : IRequest<SubjectDetailsVm>
    {
        public Guid Id { get; init; }
    }
}