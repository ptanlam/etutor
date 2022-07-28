using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Degrees.ViewModels;

namespace TutorService.Application.Features.Degrees.Commands.UpdateDegreeForTutor
{
    public class
        UpdateDegreeForTutorHandler : IRequestHandler<UpdateDegreeForTutor, (bool found, List<ValidationFailure> errors,
            DegreeVm degree)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IConstantsService _constantsService;
        private readonly IValidator<UpdateDegreeForTutor> _validator;
        private readonly IMapper _mapper;

        public UpdateDegreeForTutorHandler(
            ITutorsRepository tutorsRepository,
            IConstantsService constantsService,
            IValidator<UpdateDegreeForTutor> validator, 
            IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(bool found, List<ValidationFailure> errors, DegreeVm degree)> Handle(
            UpdateDegreeForTutor request, CancellationToken cancellationToken)
        {
            var degree = request.Tutor.Degrees.FirstOrDefault(d => d.Id == request.Id);
            if (degree == null) return (false, null, null);

            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (false, validationResult.Errors, null);

            degree.UpdateName(request.Name);
            degree.UpdateMajor(request.Major);
            degree.UpdateGraduatedUniversity(request.GraduatedUniversity);
            degree.UpdateDateOfIssue(request.DateOfIssue);
            degree.UpdateAcademicRankId(request.AcademicRankId);

            await _tutorsRepository.UpdateAsync(request.Tutor);

            var degreeVm = _mapper.Map<DegreeVm>(degree);
            degreeVm.AcademicRank = await _constantsService.GetAcademicRankById(degree.AcademicRankId);
            
            return (true, null, degreeVm);
        }
    }
}