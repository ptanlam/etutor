using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Commands.UpdateTutorInformation
{
    public class UpdateTutorInformation : IRequest<(List<ValidationFailure> errors, TutorDetailsVm tutor)>
    {
        public Tutor Tutor { get; set; }
        public string Description { get; init; }
    }
}