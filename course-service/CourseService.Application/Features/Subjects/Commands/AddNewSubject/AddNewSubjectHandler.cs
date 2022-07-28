using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.SubjectAggregate;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Commands.AddNewSubject
{
    public class
        AddNewSubjectHandler : IRequestHandler<AddNewSubject, (List<ValidationFailure> errors, SubjectVm course)>
    {
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IValidator<AddNewSubject> _validator;
        private readonly IMapper _mapper;

        public AddNewSubjectHandler(ISubjectsRepository subjectsRepository, IValidator<AddNewSubject> validator,
            IMapper mapper)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, SubjectVm course)> Handle(AddNewSubject request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var course = new Subject(request.Name, request.TutorId, request.EducationalLevelId,
                request.EducationalGradeId);

            var inserted = await _subjectsRepository.AddAsync(course);

            return (null, _mapper.Map<SubjectVm>(inserted));
        }
    }
}