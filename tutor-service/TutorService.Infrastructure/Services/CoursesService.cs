using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseService.Application;
using Grpc.Core;
using TutorService.Application.Contracts.Infrastructure;

namespace TutorService.Infrastructure.Services
{
    public class CoursesService : ICoursesService
    {
        private readonly Courses.CoursesClient _client;

        public CoursesService(Courses.CoursesClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<IEnumerable<string>> GetTutorsByConditions(string subjectName, string educationalLevelId,
            string educationalGradeId)
        {
            try
            {
                var request = new GetTutorsByConditionsRequest()
                {
                    SubjectName = subjectName,
                    EducationalLevelId = educationalLevelId,
                    EducationalGradeId = educationalGradeId
                };

                var response = await _client.GetTutorsByConditionsAsync(request);
                return response.TutorIdList;
            }
            catch (RpcException)
            {
                return new List<string>();
            }
        }
    }
}