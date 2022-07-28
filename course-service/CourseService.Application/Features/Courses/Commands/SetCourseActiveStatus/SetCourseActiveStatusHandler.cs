using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.SetCourseActiveStatus
{
    public class SetCourseActiveStatusHandler : IRequestHandler<SetCourseActiveStatus, CourseVm>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly ISubjectsRepository _subjectsRepository;
        private readonly IMapper _mapper;

        public SetCourseActiveStatusHandler(ICoursesRepository coursesRepository, ISubjectsRepository subjectsRepository, 
            IMapper mapper)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<CourseVm> Handle(SetCourseActiveStatus request, CancellationToken cancellationToken)
        {
            var course = await _coursesRepository.GetByIdAsync(request.Id);
            if (course == null) return null;
            
            course.UpdateActiveStatus(request.IsActive);
            await _coursesRepository.UpdateAsync(course);

            var courseVm = _mapper.Map<CourseVm>(course);
            courseVm.SubjectName = (await _subjectsRepository.GetByIdAsync(course.SubjectId)).Name;

            return courseVm;
        }
    }
}