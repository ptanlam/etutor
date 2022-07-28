using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectListByName
{
    public class GetSubjectListByNameHandler : IRequestHandler<GetSubjectListByName, IEnumerable<SubjectVm>>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IMapper _mapper;
        private readonly IConstantsService _constantsService;

        public GetSubjectListByNameHandler(ISubjectsRepository subjectsRepository, IMapper mapper, 
            IConstantsService constantsService)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
        }
        
        public async Task<IEnumerable<SubjectVm>> Handle(GetSubjectListByName request, 
            CancellationToken cancellationToken)
        {
            var subjectList = await _subjectsRepository.ListByConditionsAsync(request.SubjectName,
                request.EducationalLevelId, request.EducationalGradeId);

            var subjectVmList = new List<SubjectVm>();
            foreach (var subject in subjectList)
            {
                var subjectVm = _mapper.Map<SubjectVm>(subject);
                subjectVm.EducationalLevel = await _constantsService.GetEducationalLevelById(subject.EducationalLevelId);
                subjectVm.EducationalGrade = await _constantsService.GetEducationalGradeById(subject.EducationalGradeId);
                subjectVmList.Add(subjectVm);
            }

            return subjectVmList;
        }
    }
}