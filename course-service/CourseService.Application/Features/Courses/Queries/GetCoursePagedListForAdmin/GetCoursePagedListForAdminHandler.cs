using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.Helper;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.Queries.GetSubjectDetails;
using CourseService.Application.Shared.Responses;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.Enums;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForAdmin
{
    public class GetCoursePagedListForAdminHandler : IRequestHandler<GetCoursePagedListForAdmin,
        (List<ValidationFailure> errors, PagedList<CourseVm> courses)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly ITutorsService _tutorsService;
        private readonly IMediator _mediator;
        private readonly IFilesService _filesService;
        private readonly IEnrollmentsService _enrollmentsService;
        private readonly IMapper _mapper;
        private readonly IValidator<GetCoursePagedListForAdmin> _validator;

        public GetCoursePagedListForAdminHandler(
            IMapper mapper,
            ICoursesRepository coursesRepository,
            ITutorsService tutorsService,
            IMediator mediator,
            IFilesService filesService,
            IEnrollmentsService enrollmentsService,
            IValidator<GetCoursePagedListForAdmin> validator)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _tutorsService = tutorsService ?? throw new ArgumentNullException(nameof(tutorsService));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _enrollmentsService = enrollmentsService ?? throw new ArgumentNullException(nameof(enrollmentsService));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }

        public async Task<(List<ValidationFailure> errors, PagedList<CourseVm> courses)> Handle(
            GetCoursePagedListForAdmin request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var courseVmPagedList = await GetCourseVmPagedList(
                Enum.Parse<CourseType>(request.Type, true),
                request.IsActive,
                request.PageNumber,
                request.PageSize);

            foreach (var courseVm in courseVmPagedList)
            {
                courseVm.NumberOfEnrollments = await _enrollmentsService.CountForCourseAsync(courseVm.Id.ToString());
                var subject = await _mediator.Send(new GetSubjectDetails {Id = courseVm.SubjectId}, cancellationToken);
                CoursesHelper.AssignAdditionalInfoForCourseVm(subject, courseVm);
                await CoursesHelper.GetTutorForCourseVm(_tutorsService, courseVm, subject.TutorId);
                await CoursesHelper.GetThumbnailForCourseVm(_filesService, courseVm);
            }

            return (null, courseVmPagedList);
        }

        private async Task<PagedList<CourseVm>> GetCourseVmPagedList(
            CourseType courseType,
            bool isActive,
            int pageNumber,
            int pageSize)
        {
            var courseList = courseType == CourseType.Online
                ? _mapper.Map<List<CourseVm>>(await _coursesRepository.ListForAdminAsync<OnlineCourse>(isActive))
                : _mapper.Map<List<CourseVm>>(await _coursesRepository.ListForAdminAsync<OneOnOneCourse>(isActive));

            return new PagedList<CourseVm>(courseList, pageNumber, pageSize);
        }
    }
}