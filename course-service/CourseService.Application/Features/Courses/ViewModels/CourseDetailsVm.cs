using System.Collections.Generic;
using CourseService.Application.Features.Syllabi.ViewModels;

namespace CourseService.Application.Features.Courses.ViewModels
{
    public class CourseDetailsVm : CourseVm
    {
        public new IEnumerable<SyllabusDetailsVm> Syllabi { get; set; }
    }
}