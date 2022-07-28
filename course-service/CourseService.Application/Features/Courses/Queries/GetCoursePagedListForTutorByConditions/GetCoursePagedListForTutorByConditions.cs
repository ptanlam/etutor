using System;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Shared.Requests;
using CourseService.Application.Shared.Responses;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForTutorByConditions
{
    public class GetCoursePagedListForTutorByConditions : GetPagedList, IRequest<PagedList<CourseVm>>
    {
        public string Type { get; init; }
        public Guid SubjectId { get; init; }
    }
}