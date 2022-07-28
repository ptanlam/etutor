using System.Collections.Generic;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectListForTutor
{
    public class GetSubjectListForTutor :IRequest<IEnumerable<SubjectVm>>
    {
        public string TutorId { get; init; }
    }
}