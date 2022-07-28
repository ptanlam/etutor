using System;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Features.Courses.Commands.AddNewCourse;
using CourseService.Application.Features.Courses.Queries.GetCourseBasicInfo;
using CourseService.Application.Features.Subjects.Queries.GetTutorListByConditions;
using CourseService.Domain.Enums;
using Grpc.Core;
using MediatR;

namespace CourseService.Infrastructure.Services
{
    public class CoursesService : Courses.CoursesBase
    {
        private readonly IMediator _mediator;

        public CoursesService(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public override async Task<GetTutorsByConditionsResponse> GetTutorsByConditions(
            GetTutorsByConditionsRequest request,
            ServerCallContext context)
        {
            var getTutorListByConditions = new GetTutorListByConditions
            {
                Name = request.SubjectName,
                EducationalLevelId = request.EducationalLevelId,
                EducationalGradeId = request.EducationalGradeId
            };

            var tutorIdList = await _mediator.Send(getTutorListByConditions);

            var response = new GetTutorsByConditionsResponse();
            response.TutorIdList.AddRange(tutorIdList);

            return response;
        }

        public override async Task<GetCourseBasicInfoResponse> GetCourseBasicInfo(
            GetCourseBasicInfoRequest request,
            ServerCallContext context)
        {
            var valid = Guid.TryParse(request.Id, out var courseId);
            if (!valid) return new GetCourseBasicInfoResponse();

            return await _mediator.Send(new GetCourseBasicInfo {Id = courseId});
        }

        public override async Task<CreateOneOnOneCourseResponse> CreateOneOnOneCourse(
            CreateOneOnOneCourseRequest request,
            ServerCallContext context)
        {
            var addNewCourse = new AddNewCourse
            {
                TutorId = request.TutorId,
                SubjectId = Guid.Parse(request.SubjectId),
                TuitionFeeAmount = (decimal) request.TuitionFeeAmount,
                TuitionFeeUnit = request.TuitionFeeUnit,

                StartDate = DateTimeOffset.Parse(request.StartDate),
                EndDate = DateTimeOffset.Parse(request.EndDate),

                LearningDays = request.LearningDays.Split(','),
                Type = CourseType.OneOnOne.ToString()
            };


            // TODO: Handle exceptions
            var (errors, hasSession, course) = await _mediator.Send(addNewCourse);

            return new CreateOneOnOneCourseResponse {Id = course.Id.ToString()};
        }
    }
}