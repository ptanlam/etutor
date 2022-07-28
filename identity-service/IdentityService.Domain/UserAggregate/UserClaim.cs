using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IdentityService.Domain.UserAggregate
{
    public class UserClaim
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        private UserClaim()
        {
        }

        public UserClaim(string userId, string name, string value)
        {
            UserId = userId;
            Name = name;
            Value = value;
        }
    }
}