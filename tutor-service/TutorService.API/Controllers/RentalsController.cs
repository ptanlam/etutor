using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TutorService.Application.Features.Rentals.Commands.AddRentalForTutor;
using TutorService.Application.Features.Tutors.Queries.GetTutorById;

namespace TutorService.API.Controllers
{
    [ApiController]
    [Route("tutors/{tutorId:guid}/rentals")]
    public class RentalsController : BaseController
    {
        private readonly IMediator _mediator;

        public RentalsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> AddForTutor(
            [FromRoute] Guid tutorId,
            [FromBody] AddRentalForTutor addRentalForTutor)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            addRentalForTutor.Tutor = tutor;
            var (errors, rental) = await _mediator.Send(addRentalForTutor);
            if (errors != null) return NotFound(errors);

            return Ok(rental);
        }
    }
}