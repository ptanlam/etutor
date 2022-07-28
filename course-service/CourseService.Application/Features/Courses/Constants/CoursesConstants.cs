using System.Text.RegularExpressions;

namespace CourseService.Application.Features.Courses.Constants
{
    public static class CoursesConstants
    {
        public static Regex TimeFormat = new("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
    }
}