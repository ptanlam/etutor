using System.Collections.Generic;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Shared.Requests;
using CourseService.Application.Shared.Responses;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForAdmin
{
    public class GetCoursePagedListForAdmin : GetPagedList, 
        IRequest<(List<ValidationFailure> errors, PagedList<CourseVm> courses)>
    {
        public string Type { get; init; }
        public bool IsActive { get; init; }
    }
}