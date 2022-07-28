using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseService.Domain.CourseAggregate;

namespace CourseService.Application.Contracts.Persistence
{
    public interface ICoursesRepository: IAsyncReadRepository<Course>, IAsyncRepository<Course>
    {
        Task<List<TCourse>> ListForSubjectAsync<TCourse>(Guid subjectId) where TCourse : Course;
        
        Task<List<TCourse>> ListByConditionsForSubjectAsync<TCourse>(IEnumerable<Guid> subjectIdList, 
            DateTime? startDate, IEnumerable<string> learningDays, string startAt) where TCourse: Course;

        Task<List<TCourse>> ListByConditionsForTutorAsync<TCourse>(Guid subjectId) where TCourse : Course;

        Task<List<TCourse>> ListForAdminAsync<TCourse>(bool isActive) where TCourse : Course;
    }
}