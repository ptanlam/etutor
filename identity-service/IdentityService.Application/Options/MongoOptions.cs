namespace IdentityService.Application.Options
{
    public class MongoOptions
    {
        public const string Name = "Mongo";

        public string ConnectionString { get; init; }
        public string DatabaseName { get; init; }
        public string Collection { get; init; }
    }
}