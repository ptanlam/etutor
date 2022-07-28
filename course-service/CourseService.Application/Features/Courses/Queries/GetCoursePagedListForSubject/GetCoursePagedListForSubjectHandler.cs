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
using CourseService.Application.Shared.Responses;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubject
{
    public class GetCoursePagedListForSubjectHandler : IRequestHandler<GetCoursePagedListForSubject, 
        PagedList<CourseVm>>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IMapper _mapper;
        private readonly IFilesService _filesService;

        public GetCoursePagedListForSubjectHandler(
            ICoursesRepository coursesRepository, 
            IMapper mapper,
            IFilesService filesService)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
        }
        
        public async Task<PagedList<CourseVm>> Handle(GetCoursePagedListForSubject request, CancellationToken 
            cancellationToken)
        {
            var subjectIdList = new List<Guid> {request.Subject.Id};
            var courseList = await CoursesHelper.GetCourseList(_coursesRepository, subjectIdList, 
                request.Type, null, null, null);

            var courseVmList = _mapper.Map<List<CourseVm>>(courseList);
            var coursePagedList = new PagedList<CourseVm>(courseVmList, request.PageNumber, request.PageSize);
           
            foreach (var course in courseVmList)
            {
                course.Tutor = null;
                course.SubjectName = request.Subject.Name;
                course.EducationalLevel = request.Subject.EducationalLevel;
                course.EducationalGrade = request.Subject.EducationalGrade;
                course.Thumbnail = (await _filesService.GetFileListForOwner(course.Id.ToString())).FirstOrDefault();
            }

            return coursePagedList;
        }
    }
}