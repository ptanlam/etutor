using EnrollmentService.Application.Features.Performers.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Performers.Queries.GetPerformerByEmail
{
    public class GetPerformerByEmail : IRequest<PerformerVm>
    {
        public string Email { get; init; }
    }
}