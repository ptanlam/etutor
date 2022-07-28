using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.ApproveOneOnOneCourse
{
    public class ApproveOneOnOneCourseHandler : IRequestHandler<ApproveOneOnOneCourse, CourseVm>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IMapper _mapper;

        public ApproveOneOnOneCourseHandler(ICoursesRepository coursesRepository, IMapper mapper)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CourseVm> Handle(ApproveOneOnOneCourse request, CancellationToken cancellationToken)
        {
            (request.Course as OneOnOneCourse)?.ApproveByTutor();
            await _coursesRepository.UpdateAsync(request.Course);
            return _mapper.Map<CourseVm>(request.Course);
        }
    }
}