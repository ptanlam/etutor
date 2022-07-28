using System;
using CourseService.Domain.SubjectAggregate;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectById
{
    public class GetSubjectById : IRequest<Subject>
    {
        public Guid Id { get; init; }
    }
}