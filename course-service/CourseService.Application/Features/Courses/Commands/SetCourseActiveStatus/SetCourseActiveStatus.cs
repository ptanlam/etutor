using System;
using CourseService.Application.Features.Courses.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.SetCourseActiveStatus
{
    public class SetCourseActiveStatus : IRequest<CourseVm>
    {
        public Guid Id { get; set; }
        public bool IsActive { get; init; }
    }
}