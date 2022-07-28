using EnrollmentService.Application.Features.Performers.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Performers.Commands.CreateNewPerformer
{
    public class CreateNewPerformer : IRequest<PerformerVm>
    {
        public string Name { get; init; }
        public string Email { get; set; }
    }
}