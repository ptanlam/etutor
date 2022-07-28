using System;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace CourseService.Infrastructure.Services
{
    public class EnrollmentsService : IEnrollmentsService
    {
        private readonly Enrollments.EnrollmentsClient _client;

        public EnrollmentsService(Enrollments.EnrollmentsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<int> CountForCourseAsync(string courseId)
        {
            try
            {
                var response = await _client.CountEnrollmentsForCourseAsync(new CountEnrollmentsForCourseRequest
                    {CourseId = courseId});

                return response.NumberOfEnrollments;
            }
            catch (RpcException)
            {
                return default;
            }
        }
    }
}