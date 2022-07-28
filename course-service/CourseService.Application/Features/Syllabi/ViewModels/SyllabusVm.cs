using System;
using Google.Protobuf.Collections;

namespace CourseService.Application.Features.Syllabi.ViewModels
{
    public class SyllabusVm
    {
        public Guid Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public string Achievements { get; init; }
        public DateTime FromDate { get; init; }
        public DateTime ToDate { get; init; }
        public RepeatedField<UploadedFile> Files { get; set; }
    }
}