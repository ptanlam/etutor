namespace CourseService.Application.Options
{
    public class GrpcOptions
    {
        public const string Name = "GrpcServices";

        public string StorageService { get; init; }
        public string TutorsService { get; init; }
        public string ConstantsService { get; init; }
        public string EnrollmentsService { get; init; }
        public string SessionsService { get; init; }
    }
}