using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectListForTutor
{
    public class GetSubjectListForTutorHandler : IRequestHandler<GetSubjectListForTutor, IEnumerable<SubjectVm>>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IConstantsService _constantsService;
        private readonly IMapper _mapper;

        public GetSubjectListForTutorHandler(ISubjectsRepository subjectsRepository, IConstantsService constantsService,
            IMapper mapper)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<SubjectVm>> Handle(GetSubjectListForTutor request, 
            CancellationToken cancellationToken)
        {
            var subjectList = await _subjectsRepository.ListForTutorAsync(request.TutorId);

            var subjectVmList = new List<SubjectVm>();

            foreach (var subject in subjectList)
            {
                var subjectVm = _mapper.Map<SubjectVm>(subject);
                
                subjectVm.EducationalLevel = await _constantsService.GetEducationalLevelById(
                    subject.EducationalLevelId);
                subjectVm.EducationalGrade = await _constantsService.GetEducationalGradeById(
                    subject.EducationalGradeId);

                subjectVmList.Add(subjectVm);
            }

            return subjectVmList;
        }
    }
}