namespace TutorService.Infrastructure.IntegrationMessages.Commands
{
    public class UploadedImage
    {
        public Google.Protobuf.ByteString Buffer { get; init; }
        public string Filename { get; init; }
        public string Mimetype { get; init; }
    }
}