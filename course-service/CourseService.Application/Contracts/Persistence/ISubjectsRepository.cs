using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Domain.SubjectAggregate;

namespace CourseService.Application.Contracts.Persistence
{
    public interface ISubjectsRepository : IAsyncReadRepository<Subject>, IAsyncRepository<Subject>
    {
        Task<Subject> GetByNameFroTutorAsync(string name, string tutorId);
        Task<List<Subject>> ListForTutorAsync(string tutorId);
        Task<List<Subject>> ListByConditionsAsync(string name, string educationalLevelId, string educationalGradeId);
        Task<IEnumerable<string>> NameListAsync(string query, CancellationToken cancellationToken);
        Task<List<string>> TutorsByConditionsAsync(string name, string educationalLevelId, string educationalGradeId);
    }
}