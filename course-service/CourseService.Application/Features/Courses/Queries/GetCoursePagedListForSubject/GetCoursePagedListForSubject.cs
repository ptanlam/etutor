using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Application.Shared.Requests;
using CourseService.Application.Shared.Responses;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubject
{
    public class GetCoursePagedListForSubject : GetPagedList, IRequest<PagedList<CourseVm>>
    {
        public SubjectDetailsVm Subject { get; set; }
        public string Type { get; init; }
    }
}