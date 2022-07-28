using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.ApproveOneOnOneCourse
{
    public class ApproveOneOnOneCourse : IRequest<CourseVm>
    {
        public Course Course { get; set; }
    }
}