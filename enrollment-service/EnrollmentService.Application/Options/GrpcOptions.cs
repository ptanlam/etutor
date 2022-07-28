namespace EnrollmentService.Application.Options
{
    public class GrpcOptions
    {
        public const string Name = "GrpcServices";

        public string CoursesService { get; init; }
        public string SessionsService { get; init; }
    }
}