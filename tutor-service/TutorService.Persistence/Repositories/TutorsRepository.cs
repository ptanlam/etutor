using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using TutorService.Application.Contracts.Persistence;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Persistence.Repositories
{
    public class TutorsRepository : BaseRepository<Tutor>, ITutorsRepository
    {
        public TutorsRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Tutor>> ListAsync()
        {
            return await DbContext.Tutors
                .Where(t => t.IsActive && t.Rentals.FirstOrDefault(r => r.IsActive) != null)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public Task<List<Tutor>> ListByConditionsAsync(List<string> tutorIdList, List<string> userIdList)
        {
            var predicate = PredicateBuilder.New<Tutor>();
            predicate.Start(t => t.IsActive && t.Rentals.FirstOrDefault(r => r.IsActive) != null);

            // TODO: add degree and certificate filtering

            if (userIdList.Any())
            {
                predicate.And(t => userIdList.Contains(t.UserId, StringComparer.InvariantCultureIgnoreCase));
            }

            if (tutorIdList.Any())
            {
                predicate.And(t => tutorIdList.Contains(t.Id.ToString(), StringComparer.InvariantCultureIgnoreCase));
            }

            return Task.FromResult(DbContext.Tutors
                .Include(t => t.Rentals.OrderBy(r => r.Id))
                .AsExpandable()
                .AsEnumerable()
                .Where(predicate.Compile())
                .ToList());
        }

        public async Task<IEnumerable<string>> NameListAsync(string query, CancellationToken cancellationToken)
        {
            return await DbContext.Tutors.Where(t => t.FullName.Contains(query))
                .Select(t => t.FullName)
                .Distinct()
                .OrderBy(fn => fn)
                .Take(10)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<Tutor>> ListAsyncForAdmin(bool isActive)
        {
            return await DbContext.Tutors.Where(t => t.IsActive == isActive)
                .Include(t => t.Rentals.OrderBy(r => r.Id))
                .OrderBy(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task UpdateTutorFullName(string userId, string fullName)
        {
            var tutor = await DbContext.Tutors.FirstOrDefaultAsync(t => t.UserId == userId);
            tutor?.UpdateFullname(fullName);
            await DbContext.SaveChangesAsync();
        }

        public override async Task<Tutor> GetByIdAsync(Guid id)
        {
            return await GetDetails(DbContext.Tutors.Where(t => t.Id == id));
        }

        public async Task<Tutor> GetForUserAsync(string userId)
        {
            return await GetDetails(DbContext.Tutors.Where(t => t.UserId == userId));
        }

        private async Task<Tutor> GetDetails(IQueryable<Tutor> queryable)
        {
            return await queryable
                .Include(t => t.Certificates.OrderByDescending(c => c.ExpiresIn))
                .Include(t => t.Degrees.OrderBy(d => d.DateOfIssue))
                .Include(t => t.Rentals.OrderBy(r => r.Id))
                .AsSplitQuery()
                .SingleOrDefaultAsync();
        }
    }
}