using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubjectByConditions;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.Queries.GetSubjectDetails;
using CourseService.Application.Features.Subjects.Queries.GetSubjectListByName;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Application.Features.Syllabi.Queries.GetFileListForSyllabus;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Application.Shared.Responses;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.Enums;
using Google.Protobuf.Collections;
using MediatR;

namespace CourseService.Application.Features.Courses.Helper
{
    public static class CoursesHelper
    {
        public static void AssignAdditionalValues(CourseVm course, SubjectVm subject, GetTutorBasicInfoResponse tutor,
            IEnumerable<File> thumbnail)
        {
            course.Tutor = tutor;
            course.SubjectName = subject.Name;
            course.EducationalLevel = subject.EducationalLevel;
            course.EducationalGrade = subject.EducationalGrade;
            course.Thumbnail = thumbnail.FirstOrDefault();
        }

        public static async Task GetTutorForCourseVm(ITutorsService tutorsService, CourseVm courseVm, string tutorId)
        {
            var tutor = await tutorsService.GetTutorBasicInfo(tutorId);
            courseVm.Tutor = tutor;
        }

        public static async Task GetThumbnailForCourseVm(IFilesService filesService, CourseVm courseVm)
        {
            var thumbnailList = await filesService.GetFileListForOwner(courseVm.Id.ToString());
            courseVm.Thumbnail = thumbnailList.FirstOrDefault();
        }

        public static void AssignAdditionalInfoForCourseVm(SubjectDetailsVm subject, CourseVm courseVm)
        {
            courseVm.SubjectName = subject.Name;
            courseVm.EducationalLevel = subject.EducationalLevel;
            courseVm.EducationalGrade = subject.EducationalGrade;
        }

        public static void GetCourseListWithAdditionalValues(
            IEnumerable<CourseVm> courseList,
            SubjectVm subject,
            GetTutorBasicInfoResponse tutor)
        {
            var courseListWithAdditionalValues = courseList.ToList();
            foreach (var course in courseListWithAdditionalValues)
            {
                course.Tutor = tutor;
                course.SubjectName = subject.Name;
                course.EducationalLevel = subject.EducationalLevel;
                course.EducationalGrade = subject.EducationalGrade;
            }
        }

        public static async Task<IEnumerable<Course>> GetCourseList(ICoursesRepository coursesRepository,
            IEnumerable<Guid> subjectIdList, string type, DateTime? startDate, IEnumerable<string> learningDays,
            string startAt)
        {
            var courseType = GetCourseType(type);

            var task = (Task) coursesRepository.GetType()
                .GetMethod("ListByConditionsForSubjectAsync")
                ?.MakeGenericMethod(courseType)
                .Invoke(coursesRepository, new object[]
                    {subjectIdList, startDate, learningDays, startAt});

            if (task != null) await task.ConfigureAwait(false);
            var courseList = task?.GetType().GetProperty("Result")?.GetValue(task);

            return courseList as IEnumerable<Course>;
        }


        public static async Task<IEnumerable<SubjectVm>> GetSubjectList(
            IMediator mediator,
            GetCoursePagedListForSubjectByConditions request,
            CancellationToken cancellationToken)
        {
            return await mediator.Send(new GetSubjectListByName
            {
                SubjectName = request.SubjectName,
                EducationalLevelId = request.EducationalLevelId,
                EducationalGradeId = request.EducationalGradeId
            }, cancellationToken);
        }

        public static async Task<GetTutorBasicInfoResponse> GetTutorInfo(
            ITutorsService tutorsService,
            string tutorId)
        {
            return await tutorsService.GetTutorBasicInfo(tutorId);
        }

        public static async Task<IEnumerable<SyllabusDetailsVm>> GetSyllabiForOnlineCourse(
            IMediator mediator,
            IEnumerable<Syllabus> syllabi)
        {
            var syllabusDetailsVmList = new List<SyllabusDetailsVm>();

            foreach (var syllabus in syllabi)
                syllabusDetailsVmList.Add(await mediator.Send(
                    new GetFileListForSyllabus {Syllabus = syllabus}));

            return syllabusDetailsVmList;
        }

        private static Type GetCourseType(string type)
        {
            if (string.IsNullOrEmpty(type)) return typeof(Course);

            Enum.TryParse<CourseType>(type, true, out var courseType);
            return courseType switch
            {
                CourseType.Online => typeof(OnlineCourse),
                CourseType.OneOnOne => typeof(OneOnOneCourse),
                _ => typeof(Course)
            };
        }
    }
}