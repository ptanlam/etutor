namespace PaymentService.Application.Options;

public class GrpcOptions
{
    public const string Name = "GrpcServices";

    public string CoursesService { get; init; } = string.Empty;
    public string TutorsService { get; init; } = string.Empty;
}