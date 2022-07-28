using System;
using System.Collections.Generic;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Shared.Requests;
using CourseService.Application.Shared.Responses;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubjectByConditions
{
    public class GetCoursePagedListForSubjectByConditions : GetPagedList, IRequest<(List<ValidationFailure> errors, 
        PagedList<CourseVm> courseList)>
    {
        public string SubjectName { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
        public DateTime? StartDate { get; init; }
        public IEnumerable<string> LearningDays { get; init; }
        public string StartAt { get; init; } // HH:mm
        public string Type { get; init; }
    }
}