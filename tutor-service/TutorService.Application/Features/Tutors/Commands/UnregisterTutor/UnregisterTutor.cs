using MediatR;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Commands.UnregisterTutor
{
    public class UnregisterTutor : IRequest<bool>
    {
        public Tutor Tutor { get; set; }
    }
}