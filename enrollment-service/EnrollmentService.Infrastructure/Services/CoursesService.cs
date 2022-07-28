using System;
using System.Threading.Tasks;
using EnrollmentService.Application;
using EnrollmentService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace EnrollmentService.Infrastructure.Services
{
    public class CoursesService : ICoursesService
    {
        private readonly Courses.CoursesClient _client;

        public CoursesService(Courses.CoursesClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<string> CreateOneOnOneCourse(CreateOneOnOneCourseRequest request)
        {
            try
            {
                var course = await _client.CreateOneOnOneCourseAsync(request);
                return course.Id;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }

        public async Task<GetCourseBasicInfoResponse> GetCourseById(string id)
        {
            try
            {
                var course = await _client.GetCourseBasicInfoAsync(new GetCourseBasicInfoRequest {Id = id});
                return course;
            }
            catch (RpcException e)
            {
                return null;
            }
        }
    }
}