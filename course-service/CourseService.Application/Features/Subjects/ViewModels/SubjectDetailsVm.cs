using System;
using System.Collections.Generic;
using CourseService.Application.Features.Courses.ViewModels;

namespace CourseService.Application.Features.Subjects.ViewModels
{
    public class SubjectDetailsVm : SubjectVm
    {
        public DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; init; }
    }
}