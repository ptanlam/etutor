using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using CourseService.Domain.CourseAggregate;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Persistence.Repositories
{
    public class CoursesRepository : BaseRepository<Course>, ICoursesRepository
    {
        public CoursesRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public override async Task<Course> GetByIdAsync(Guid id)
        {
            var query = DbContext.Courses.Where(c => c.Id == id);

            var course = await query.FirstOrDefaultAsync();
            if (course is not OnlineCourse) return course;

            return await query.Include(c => (c as OnlineCourse).Syllabi).FirstOrDefaultAsync();
        }

        public async Task<List<TCourse>> ListForAdminAsync<TCourse>(bool isActive) where TCourse : Course
        {
            var predicate = PredicateBuilder.New<TCourse>();
            predicate.Start(c => c.IsActive == isActive);

            if (typeof(TCourse) == typeof(OneOnOneCourse)) predicate.And(c => (c as OneOnOneCourse).TutorApproved);

            return await DbContext.Set<TCourse>().Where(predicate).ToListAsync();
        }

        public Task<List<TCourse>> ListForSubjectAsync<TCourse>(Guid subjectId) where TCourse : Course
        {
            var predicate = PredicateBuilder.New<TCourse>();
            predicate.Start(c => c.SubjectId == subjectId && c.IsActive && c.DeletedAt == null);

            return Task.FromResult(DbContext.Set<TCourse>().Where(predicate.Compile()).ToList());
        }

        public Task<List<TCourse>> ListByConditionsForSubjectAsync<TCourse>(
            IEnumerable<Guid> subjectIdList,
            DateTime? startDate,
            IEnumerable<string> learningDays,
            string startAt) where TCourse : Course
        {
            var predicate = PredicateBuilder.New<TCourse>();
            predicate.Start(c => subjectIdList.Contains(c.SubjectId) && c.IsActive && c.DeletedAt == null);

            if (startDate != null) predicate.And(c => c.StartDate >= startDate);
            if (!string.IsNullOrEmpty(startAt)) AddCourseTimeFilter(startAt, predicate);
            if (learningDays != null)
                predicate.And(c => CheckLearningDaysIncludeChosenDays(c.LearningDays, learningDays));

            return Task.FromResult(DbContext.Set<TCourse>().Where(predicate.Compile())
                .OrderByDescending(c => c.UpdatedAt)
                .ThenByDescending(c => c.CreatedAt)
                .ToList());
        }

        public Task<List<TCourse>> ListByConditionsForTutorAsync<TCourse>(Guid subjectId) where TCourse : Course
        {
            var predicate = PredicateBuilder.New<TCourse>();
            predicate.Start(c => c.SubjectId == subjectId);

            var query = DbContext.Set<TCourse>();
            if (typeof(TCourse) == typeof(OnlineCourse)) query.Include(c => (c as OnlineCourse).Syllabi);

            return Task.FromResult(query.Where(predicate.Compile())
                .OrderByDescending(c => c.UpdatedAt)
                .ThenByDescending(c => c.CreatedAt)
                .ToList());
        }

        private static void AddCourseTimeFilter<TCourse>(string startAt, ExpressionStarter<TCourse> predicate)
            where TCourse : Course
        {
            var time = startAt.Split(":");
            predicate.And(c => c.StartAtHour >= int.Parse(time[0])
                               && c.StartAtMinute >= int.Parse(time[1]));
        }

        private static bool CheckLearningDaysIncludeChosenDays(string learningDays, IEnumerable<string> chosenDays)
        {
            return chosenDays.Any(day => learningDays.Contains(day, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}