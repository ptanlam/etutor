using System;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse
{
    public class AddNewSyllabus
    {
        public string Title { get; init; }
        public string Description { get; init; }
        public string Achievements { get; init; }
        public DateTime FromDate { get; init; }
        public DateTime ToDate { get; init; }
        public IFormFileCollection Files { get; init; }
    }
}