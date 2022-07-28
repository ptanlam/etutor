using System;

namespace EnrollmentService.Application.Features.Performers.ViewModels
{
    public class PerformerVm
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Email { get; init; }
    }
}