namespace CourseService.Domain.Common
{
    public class BaseEntity<TId>
    {
        public TId Id { get; protected set; }
    }
}