namespace TutorService.Application.Options
{
    public class GrpcOptions
    {
        public const string Grpc = "GrpcServices";

        public string StorageService { get; init; }
        public string CoursesService { get; init; }
        public string ConstantsService { get; init; }
        public string IdentitiesService { get; init; }
    }
}