using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.Helper;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Application.Shared.Responses;
using CourseService.Domain.CourseAggregate;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubjectByConditions
{
    public class GetCoursePagedListForSubjectByConditionsHandler : IRequestHandler<
        GetCoursePagedListForSubjectByConditions, (List<ValidationFailure> errors, PagedList<CourseVm> courseList)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IValidator<GetCoursePagedListForSubjectByConditions> _validator;
        private readonly ITutorsService _tutorsService;
        private readonly IFilesService _filesService;
        private readonly IEnrollmentsService _enrollmentsService;

        public GetCoursePagedListForSubjectByConditionsHandler(ICoursesRepository coursesRepository, IMapper mapper,
            IMediator mediator, IValidator<GetCoursePagedListForSubjectByConditions> validator,
            ITutorsService tutorsService, IFilesService filesService, IEnrollmentsService enrollmentsService)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));

            _tutorsService = tutorsService ?? throw new ArgumentNullException(nameof(tutorsService));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _enrollmentsService = enrollmentsService ?? throw new ArgumentNullException(nameof(enrollmentsService));
        }

        public async Task<(List<ValidationFailure> errors, PagedList<CourseVm> courseList)> Handle(
            GetCoursePagedListForSubjectByConditions request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var subjectList = (await CoursesHelper.GetSubjectList(_mediator, request, cancellationToken)).ToList();
            var subjectIdList = subjectList.Select(s => s.Id);

            var courseList = await CoursesHelper.GetCourseList(_coursesRepository, subjectIdList, request.Type,
                request.StartDate, request.LearningDays, request.StartAt);

            var courseVmList = await GetCourseVmList(courseList, subjectList);
            return (null, new PagedList<CourseVm>(courseVmList.ToList(), request.PageNumber, request.PageSize));
        }

        private async Task<IEnumerable<CourseVm>> GetCourseVmList(IEnumerable<Course> courseList,
            IReadOnlyCollection<SubjectVm> subjectList)
        {
            var tutorList = new List<GetTutorBasicInfoResponse>();

            return await Task.WhenAll(courseList.Select(async course =>
            {
                var subject = subjectList.FirstOrDefault(s => s.Id == course.SubjectId);
                if (subject == null) return null;

                var tutor = tutorList.FirstOrDefault(t => t.Id == subject.TutorId);
                if (tutor == null)
                {
                    tutor = await CoursesHelper.GetTutorInfo(_tutorsService, subject.TutorId);
                    if (tutor != null) tutorList.Add(tutor);
                }

                var files = await _filesService.GetFileListForOwner(course.Id.ToString());

                var courseVm = _mapper.Map<CourseVm>(course);
                courseVm.NumberOfEnrollments = await _enrollmentsService.CountForCourseAsync(course.Id.ToString());
                CoursesHelper.AssignAdditionalValues(courseVm, subject, tutor, files);

                return courseVm;
            }));
        }
    }
}