namespace PaymentService.Application.Contracts.Infrastructure;

public interface ITutorsService
{
    Task<GetTutorBasicInfoResponse> GetTutorInfo(string tutorId, CancellationToken cancellationToken);
}