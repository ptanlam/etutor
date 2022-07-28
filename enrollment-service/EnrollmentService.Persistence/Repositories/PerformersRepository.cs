using System.Linq;
using System.Threading.Tasks;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Domain.PerformerAggregate;
using Microsoft.EntityFrameworkCore;

namespace EnrollmentService.Persistence.Repositories
{
    public class PerformersRepository : BaseRepository<Performer>, IPerformersRepository
    {
        public PerformersRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Performer> GetByEmailAsync(string email)
        {
            return await DbContext.Performers.Where(p => p.Email == email).FirstOrDefaultAsync();
        }
    }
}