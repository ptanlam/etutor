using System;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Syllabi.Queries.GetFileListForSyllabus
{
    public class GetFileListForSyllabus : IRequest<SyllabusDetailsVm>
    {
        public Syllabus Syllabus { get; init; }
    }
}