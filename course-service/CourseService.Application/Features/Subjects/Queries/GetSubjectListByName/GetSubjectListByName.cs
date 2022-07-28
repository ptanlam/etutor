using System.Collections.Generic;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectListByName
{
    public class GetSubjectListByName :IRequest<IEnumerable<SubjectVm>>
    {
        public string SubjectName { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}