using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Commands.UpdateSubject
{
    public class
        UpdateSubjectHandler : IRequestHandler<UpdateSubject, (List<ValidationFailure> errors, SubjectVm course)>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IValidator<UpdateSubject> _validator;
        private readonly IMapper _mapper;

        public UpdateSubjectHandler(ISubjectsRepository subjectsRepository, IValidator<UpdateSubject> validator,
            IMapper mapper)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, SubjectVm course)> Handle(UpdateSubject request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            request.Subject.UpdateName(request.Name);
            request.Subject.UpdateTutorId(request.TutorId);
            request.Subject.UpdateEducationalLevelId(request.EducationalLevelId);
            request.Subject.UpdateEducationalGradeId(request.EducationalGradeId);

            await _subjectsRepository.UpdateAsync(request.Subject);
            return (null, _mapper.Map<SubjectVm>(request.Subject));
        }
    }
}