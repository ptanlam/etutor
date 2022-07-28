using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Domain.CourseAggregate;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.UpdateCourse
{
    public class UpdateCourseHandler : IRequestHandler<UpdateCourse, (List<ValidationFailure> errors, CourseVm course)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IValidator<UpdateCourse> _validator;
        private readonly IMapper _mapper;

        public UpdateCourseHandler(ICoursesRepository coursesRepository, ISubjectsRepository subjectsRepository, 
            IValidator<UpdateCourse> validator, IMapper mapper)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, CourseVm course)> Handle(UpdateCourse request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);
            
            request.Course.UpdateTuitionFeeAmount(request.TuitionFeeAmount);
            request.Course.UpdateTuitionFeeUnit(request.TuitionFeeUnit);
            request.Course.UpdateSubjectId(request.SubjectId);
            request.Course.UpdateStartDate(request.StartDate);
            request.Course.UpdateEndDate(request.EndDate);
            
            if (request.Course is OnlineCourse onlineCourse)
            {
                onlineCourse.UpdateName(request.Name);
                onlineCourse.UpdateDescription(request.Description);
                onlineCourse.UpdateMaxNumberOfStudents(request.MaxNumberOfStudents);
            }

            await _coursesRepository.UpdateAsync(request.Course);

            var courseVm = _mapper.Map<CourseVm>(request.Course);
            courseVm.SubjectName = (await _subjectsRepository.GetByIdAsync(request.Course.SubjectId)).Name;
            
            return (null, courseVm);
        }
    }
}