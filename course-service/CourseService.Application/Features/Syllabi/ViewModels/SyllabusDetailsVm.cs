using System;
using Google.Protobuf.Collections;

namespace CourseService.Application.Features.Syllabi.ViewModels
{
    public class SyllabusDetailsVm
    {
        public Guid Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public string Achievements { get; init; }
        public DateTime FromDate { get; init; }
        public DateTime ToDate { get; init; }
        public RepeatedField<File> Files { get; set; }
    }
}