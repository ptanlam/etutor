namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public class FileUploadingDto
    {
        public Google.Protobuf.ByteString Buffer { get; init; }
        public string Filename { get; init; }
        public string Mimetype { get; init; }
    }
}