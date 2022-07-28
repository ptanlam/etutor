using Grpc.Core;
using PaymentService.Application;
using PaymentService.Application.Contracts.Infrastructure;

namespace PaymentService.Infrastructure.Services;

public class CoursesService : ICoursesService
{
    private readonly Courses.CoursesClient _client;

    public CoursesService(Courses.CoursesClient client)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
    }

    public async Task<GetCourseBasicInfoResponse> GetCourseInfo(string courseId,
        CancellationToken cancellationToken)
    {
        try
        {
            return await _client.GetCourseBasicInfoAsync(new GetCourseBasicInfoRequest {Id = courseId},
                cancellationToken: cancellationToken);
        }
        catch (RpcException)
        {
            return new GetCourseBasicInfoResponse();
        }
    }
}