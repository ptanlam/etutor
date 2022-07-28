using System;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseById
{
    public class GetCourseByIdHandler : IRequestHandler<GetCourseById, Course>
    {
        private readonly ICoursesRepository _coursesRepository;

        public GetCourseByIdHandler(ICoursesRepository coursesRepository)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
        }

        public async Task<Course> Handle(GetCourseById request, CancellationToken cancellationToken)
        {
            return await _coursesRepository.GetByIdAsync(request.Id);
        }
    }
}