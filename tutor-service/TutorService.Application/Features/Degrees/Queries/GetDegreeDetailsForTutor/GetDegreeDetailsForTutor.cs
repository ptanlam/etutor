using MediatR;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Degrees.Queries.GetDegreeDetailsForTutor
{
    public class GetDegreeDetailsForTutor : IRequest<DegreeVm>
    {
        public Tutor Tutor { get; set; }
        public int Id { get; init; }
    }
}