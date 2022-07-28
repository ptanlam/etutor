namespace IdentityService.Application.Options
{
    public class GrpcOptions
    {
        public const string Grpc = "GrpcServices";

        public string ConstantsService { get; init; }
        public string StorageService { get; init; }
    }
}