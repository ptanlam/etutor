using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.Queries.GetSubjectDetails;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseBasicInfo
{
    public class GetCourseBasicInfoHandler : IRequestHandler<GetCourseBasicInfo, GetCourseBasicInfoResponse>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public GetCourseBasicInfoHandler(ICoursesRepository coursesRepository, IMapper mapper,
            IMediator mediator)
        {
            _coursesRepository = coursesRepository ??
                                 throw new ArgumentNullException(nameof(coursesRepository));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task<GetCourseBasicInfoResponse> Handle(GetCourseBasicInfo request,
            CancellationToken cancellationToken)
        {
            var course = await _coursesRepository.GetByIdAsync(request.Id);
            if (course == null) return new GetCourseBasicInfoResponse();

            var courseVm = _mapper.Map<CourseDetailsVm>(course);
            var subject = await _mediator.Send(
                new GetSubjectDetails {Id = course.SubjectId}, cancellationToken);

            return new GetCourseBasicInfoResponse
            {
                Id = courseVm.Id.ToString(),
                Name = courseVm.Name,
                SubjectName = subject.Name,
                EducationalLevel = subject.EducationalLevel,
                EducationalGrade = subject.EducationalGrade,
                MaxNumberOfStudents = courseVm.MaxNumberOfStudents
            };
        }
    }
}