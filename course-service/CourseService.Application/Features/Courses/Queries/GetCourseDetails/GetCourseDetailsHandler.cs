using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.Helper;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.Queries.GetSubjectDetails;
using CourseService.Domain.CourseAggregate;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseDetails
{
    public class GetCourseDetailsHandler : IRequestHandler<GetCourseDetails, CourseDetailsVm>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly ITutorsService _tutorsService;
        private readonly IFilesService _filesService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public GetCourseDetailsHandler(ICoursesRepository coursesRepository,
            ITutorsService tutorsService,
            IFilesService filesService,
            IMapper mapper, 
            IMediator mediator)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _tutorsService = tutorsService ?? throw new ArgumentNullException(nameof(tutorsService));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task<CourseDetailsVm> Handle(GetCourseDetails request,
            CancellationToken cancellationToken)
        {
            var course = await _coursesRepository.GetByIdAsync(request.Id);
            if (course == null) return null;

            var subject = await _mediator.Send(new GetSubjectDetails {Id = course.SubjectId}, cancellationToken);

            var courseVm = _mapper.Map<CourseDetailsVm>(course);
            courseVm.SubjectName = subject.Name;
            courseVm.EducationalLevel = subject.EducationalLevel;
            courseVm.EducationalGrade = subject.EducationalGrade;
            courseVm.Tutor = await CoursesHelper.GetTutorInfo(_tutorsService, subject.TutorId);
            courseVm.Thumbnail = (await _filesService.GetFileListForOwner(course.Id.ToString())).FirstOrDefault();

            if (course is OnlineCourse onlineCourse)
            {
                courseVm.Syllabi = await CoursesHelper.GetSyllabiForOnlineCourse(_mediator, onlineCourse.Syllabi);
            }

            return courseVm;
        }
    }
}