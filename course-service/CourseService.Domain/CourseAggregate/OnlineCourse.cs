using System;
using System.Collections.Generic;
using CourseService.Domain.ValueTypes;

namespace CourseService.Domain.CourseAggregate
{
    public class OnlineCourse : Course
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int MaxNumberOfStudents { get; private set; }

        private readonly List<Syllabus> _syllabi = new();
        public IReadOnlyCollection<Syllabus> Syllabi => _syllabi.AsReadOnly();

        private OnlineCourse() : base()
        {
        }

        public OnlineCourse(string name, string description, DateTimeOffset startDate, DateTimeOffset endDate, 
            string learningDays, int startAtHour, int startAtMinute, int endAtHour, int endAtMinute, Money tuitionFee, 
            Guid subjectId, int maxNumberOfStudents, IEnumerable<Syllabus> syllabi) : base(startDate, endDate, 
            learningDays, startAtHour, startAtMinute, endAtHour, endAtMinute, tuitionFee, subjectId)
        {
            Name = name;
            Description = description;
            MaxNumberOfStudents = maxNumberOfStudents;
            
            _syllabi.AddRange(syllabi);
        }
        
        public void UpdateName(string name)
        {
            if (string.IsNullOrEmpty(name)) return;
            Name = name;
        }

        public void UpdateDescription(string description)
        {
            if (string.IsNullOrEmpty(description)) return;
            Description = description;
        }

        public void UpdateMaxNumberOfStudents(int maxNumberOfStudents)
        {
            MaxNumberOfStudents = maxNumberOfStudents;
        }

        public void AddSyllabus(Syllabus syllabus)
        {
            _syllabi.Add(syllabus);
        }
        
        public void AddSyllabi(IEnumerable<Syllabus> syllabi)
        {
            _syllabi.AddRange(syllabi);
        }
    }
}