using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Features.Rentals.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Rentals.Commands.AddRentalForTutor
{
    public class AddRentalForTutor : IRequest<(IEnumerable<ValidationFailure> errors, RentalVm rental)>
    {
        public Tutor Tutor { get; set; }
        public decimal Amount { get; init; }
        public string Unit { get; set; }
    }
}