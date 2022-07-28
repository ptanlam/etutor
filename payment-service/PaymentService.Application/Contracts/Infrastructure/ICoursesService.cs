namespace PaymentService.Application.Contracts.Infrastructure;

public interface ICoursesService
{
    Task<GetCourseBasicInfoResponse> GetCourseInfo(string courseId, CancellationToken cancellationToken);
}