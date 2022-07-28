using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Syllabi.ViewModels;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Syllabi.Commands.UpdateSyllabus
{
    public class UpdateSyllabusHandler : IRequestHandler<UpdateSyllabus, 
        (bool found, List<ValidationFailure> errors, SyllabusVm syllabus)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IValidator<UpdateSyllabus> _validator;
        private readonly IMapper _mapper;

        public UpdateSyllabusHandler(ICoursesRepository coursesRepository, IValidator<UpdateSyllabus> validator, 
            IMapper mapper)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<(bool found, List<ValidationFailure> errors, SyllabusVm syllabus)> Handle(
            UpdateSyllabus request, CancellationToken cancellationToken)
        {
            var syllabus = request.Course.Syllabi.FirstOrDefault(s => s.Id == request.Id);
            if (syllabus == null) return (false, null, null);
            
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (true, validationResult.Errors, null);
            
            syllabus.UpdateTitle(request.Title);
            syllabus.UpdateDescription(request.Description);
            syllabus.UpdateAchievements(request.Achievements);
            syllabus.UpdateFromDate(request.FromDate);
            syllabus.UpdateToDate(request.ToDate);

            await _coursesRepository.UpdateAsync(request.Course);
            return (true, null, _mapper.Map<SyllabusVm>(syllabus));
        }
    }
}