using CourseService.Domain.Common;

namespace CourseService.Domain.CourseAggregate
{
    public class CourseChange : AuditableEntity
    {
        public string Field { get; }
        public string Value { get; }
        public string Comment { get; }
        public bool IsEffective { get; private set; }

        private CourseChange()
        {
        }

        public CourseChange(string field, string value, string comment)
        {
            Field = field;
            Value = value;
            Comment = comment;
            IsEffective = false;
        }
    }
}