using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetTutorListByConditions
{
    public class GetTutorListByConditionsHandler : IRequestHandler<GetTutorListByConditions, IEnumerable<string>>
    {
        private readonly ISubjectsRepository _subjectsRepository;

        public GetTutorListByConditionsHandler(ISubjectsRepository subjectsRepository)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
        }

        public async Task<IEnumerable<string>> Handle(GetTutorListByConditions request,
            CancellationToken cancellationToken)
        {
            return await _subjectsRepository.TutorsByConditionsAsync(request.Name, request.EducationalLevelId,
                request.EducationalGradeId);
        }
    }
}