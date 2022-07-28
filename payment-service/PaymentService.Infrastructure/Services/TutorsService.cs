using Grpc.Core;
using PaymentService.Application;
using PaymentService.Application.Contracts.Infrastructure;

namespace PaymentService.Infrastructure.Services;

public class TutorsService : ITutorsService
{
    private readonly Tutors.TutorsClient _client;

    public TutorsService(Tutors.TutorsClient client)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
    }

    public async Task<GetTutorBasicInfoResponse> GetTutorInfo(string tutorId, CancellationToken cancellationToken)
    {
        try
        {
            return await _client.GetTutorBasicInfoAsync(new GetTutorBasicInfoRequest {Id = tutorId},
                cancellationToken: cancellationToken);
        }
        catch (RpcException)
        {
            return new GetTutorBasicInfoResponse();
        }
    }
}