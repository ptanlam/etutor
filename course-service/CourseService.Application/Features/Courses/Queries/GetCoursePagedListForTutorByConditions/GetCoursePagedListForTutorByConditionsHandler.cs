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
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForTutorByConditions
{
    public class GetCoursePagedListForTutorByConditionsHandler : 
        IRequestHandler<GetCoursePagedListForTutorByConditions, PagedList<CourseVm>>
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IFilesService _filesService;
        private readonly ITutorsService _tutorsService;
        private readonly ICoursesRepository _coursesRepository;

        public GetCoursePagedListForTutorByConditionsHandler(
            IMapper mapper,
            IMediator mediator,
            IFilesService filesService,
            ITutorsService tutorsService,
            ICoursesRepository coursesRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _tutorsService = tutorsService ?? throw new ArgumentNullException(nameof(tutorsService));
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
        }
        
        public async Task<PagedList<CourseVm>> Handle(
            GetCoursePagedListForTutorByConditions request, 
            CancellationToken cancellationToken)
        {
            var courseList = await GetCourses(
                Enum.Parse<CourseType>(request.Type, true), 
                request.SubjectId);

            var coursePagedList = new PagedList<CourseVm>(courseList, request.PageNumber, request.PageSize);
           
            foreach (var courseVm in coursePagedList)
            {
                var subject = await _mediator.Send(new GetSubjectDetails {Id = request.SubjectId}, cancellationToken);
                CoursesHelper.AssignAdditionalInfoForCourseVm(subject, courseVm);
                await CoursesHelper.GetThumbnailForCourseVm(_filesService, courseVm);
            }

            return coursePagedList;
        }

        private async Task<List<CourseVm>> GetCourses(CourseType courseType, Guid subjectId)
        {
            return courseType == CourseType.Online
                ? _mapper.Map<List<CourseVm>>(
                    await _coursesRepository.ListByConditionsForTutorAsync<OnlineCourse>(subjectId))
                : _mapper.Map<List<CourseVm>>(
                    await _coursesRepository.ListByConditionsForTutorAsync<OneOnOneCourse>(subjectId));
        }
    }
}