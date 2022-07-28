using System;
using MediatR;

namespace CourseService.Application.Features.Courses.Queries.GetCourseBasicInfo
{
    public class GetCourseBasicInfo : IRequest<GetCourseBasicInfoResponse>
    {
        public Guid Id { get; init; }
    }
}