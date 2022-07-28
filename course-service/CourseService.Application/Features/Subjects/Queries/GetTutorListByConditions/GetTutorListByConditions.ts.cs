using System.Collections.Generic;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetTutorListByConditions
{
    public class GetTutorListByConditions : IRequest<IEnumerable<string>>
    {
        public string Name { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}