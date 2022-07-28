using System;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseById
{
    public class GetCourseById : IRequest<Course>
    {
        public Guid Id { get; init; }
    }
}