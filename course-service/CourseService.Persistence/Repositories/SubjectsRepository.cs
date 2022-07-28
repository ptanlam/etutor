using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using CourseService.Domain.SubjectAggregate;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Persistence.Repositories
{
    public class SubjectsRepository : BaseRepository<Subject>, ISubjectsRepository
    {
        public SubjectsRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Subject> GetByNameFroTutorAsync(string name, string tutorId)
        {
            return await DbContext.Subjects.FirstOrDefaultAsync(s => s.Name == name && s.TutorId == tutorId);
        }

        public async Task<List<Subject>> ListForTutorAsync(string tutorId)
        {
            return await DbContext.Subjects.Where(s => s.TutorId == tutorId).ToListAsync();
        }

        public Task<List<Subject>> ListByConditionsAsync(
            string name,
            string educationalLevelId,
            string educationalGradeId)
        {
            var predicate = BuildPredicate(name, educationalLevelId, educationalGradeId);
            return Task.FromResult(DbContext.Subjects.Where(predicate.Compile()).OrderBy(s => s.Name).ToList());
        }

        public async Task<IEnumerable<string>> NameListAsync(string query, CancellationToken cancellationToken)
        {
            return await DbContext.Subjects.Where(s => s.Name.Contains(query)).Select(c => c.Name).Distinct().Take(10)
                .ToListAsync(cancellationToken);
        }

        public Task<List<string>> TutorsByConditionsAsync(
            string name,
            string educationalLevelId,
            string educationalGradeId)
        {
            var predicate = BuildPredicate(name, educationalLevelId, educationalGradeId);
            return Task.FromResult(DbContext.Subjects.Where(predicate.Compile())
                .Select(s => s.TutorId).Distinct().ToList());
        }

        private static ExpressionStarter<Subject> BuildPredicate(
            string name,
            string educationalLevelId,
            string educationalGradeId)
        {
            var predicate = PredicateBuilder.New<Subject>();

            if (!string.IsNullOrEmpty(name))
                predicate.And(c => c.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase));

            if (!string.IsNullOrEmpty(educationalLevelId))
                predicate.And(s => s.EducationalLevelId == educationalLevelId);

            if (!string.IsNullOrEmpty(educationalGradeId))
                predicate.And(s => s.EducationalGradeId == educationalGradeId);

            return predicate;
        }
    }
}