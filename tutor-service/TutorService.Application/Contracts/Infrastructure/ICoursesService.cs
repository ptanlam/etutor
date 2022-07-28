using System.Collections.Generic;
using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Infrastructure
{
    public interface ICoursesService
    {
        Task<IEnumerable<string>> GetTutorsByConditions(string subjectName, string educationalLevelId, 
            string educationalGradeId);
    }
}