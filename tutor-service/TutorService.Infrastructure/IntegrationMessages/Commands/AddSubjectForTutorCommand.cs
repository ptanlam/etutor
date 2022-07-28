using System.Collections.Generic;
using TutorService.Application.Features.Tutors.Dtos;

namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public interface AddSubjectForTutorCommand
    {
        string TutorId { get; }
        IEnumerable<SubjectCreationDto> Subjects { get; }
    }
}