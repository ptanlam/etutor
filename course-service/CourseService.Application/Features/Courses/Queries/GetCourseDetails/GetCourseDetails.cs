using System;
using CourseService.Application.Features.Courses.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseDetails
{
    public class GetCourseDetails : IRequest<CourseDetailsVm>
    {
        public Guid Id { get; init; }
    }
}