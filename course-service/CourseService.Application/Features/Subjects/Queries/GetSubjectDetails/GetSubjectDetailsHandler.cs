using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectDetails
{
    public class GetSubjectDetailsHandler : IRequestHandler<GetSubjectDetails, SubjectDetailsVm>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IConstantsService _constantsService;
        private readonly IMapper _mapper;

        public GetSubjectDetailsHandler(ISubjectsRepository subjectsRepository, IConstantsService constantsService, 
            IMapper mapper)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<SubjectDetailsVm> Handle(GetSubjectDetails request,
            CancellationToken cancellationToken)
        {
            var subject = await _subjectsRepository.GetByIdAsync(request.Id);
            if (subject == null) return null;

            var subjectVm = _mapper.Map<SubjectDetailsVm>(subject);
            subjectVm.EducationalLevel = await _constantsService.GetEducationalLevelById(subject.EducationalLevelId);
            subjectVm.EducationalGrade = await _constantsService.GetEducationalGradeById(subject.EducationalGradeId);

            return subjectVm;
        }
    }
}