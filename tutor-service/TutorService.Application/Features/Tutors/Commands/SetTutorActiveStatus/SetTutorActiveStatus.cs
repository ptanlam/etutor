using MediatR;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Commands.SetTutorActiveStatus
{
    public class SetTutorActiveStatus : IRequest<Tutor>
    {
        public Tutor Tutor { get; set; }
        public bool IsActive { get; init; }
    }
}