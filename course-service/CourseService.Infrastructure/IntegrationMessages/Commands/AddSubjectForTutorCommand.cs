using System.Collections.Generic;
using CourseService.Application.Features.Subjects.Commands.AddNewSubject;

namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public interface AddSubjectForTutorCommand
    {
        string TutorId { get; }
        IEnumerable<SubjectCreationDto> Subjects { get; }
    }
}