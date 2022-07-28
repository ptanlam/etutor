using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TutorService.Application.Features.Degrees.Commands.AddDegreeForTutor;
using TutorService.Application.Features.Degrees.Commands.UpdateDegreeForTutor;
using TutorService.Application.Features.Degrees.Queries.GetDegreeDetailsForTutor;
using TutorService.Application.Features.Tutors.Queries.GetTutorById;

namespace TutorService.API.Controllers
{
    [ApiController]
    [Route("tutors/{tutorId:guid}/degrees")]
    public class DegreesController : BaseController
    {
        private readonly IMediator _mediator;

        public DegreesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("{id:int}", Name = "GetDegreeDetails")]
        public async Task<IActionResult> GetDetailsForTutor([FromRoute] Guid tutorId, [FromRoute] int id)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            var degree = await _mediator.Send(new GetDegreeDetailsForTutor {Tutor = tutor, Id = id});
            if (degree == null) return NotFound($"Degree with id {id} cannot be found for tutor with id {tutorId}");

            return Ok(degree);
        }

        [HttpPost]
        public async Task<IActionResult> AddForTutor([FromRoute] Guid tutorId,
            [FromForm] AddDegreeForTutor addDegreeForTutor)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            addDegreeForTutor.Tutor = tutor;
            var (errors, degree) = await _mediator.Send(addDegreeForTutor);
            if (errors != null) return BadRequest(errors);

            return CreatedAtRoute("GetDegreeDetails", new {tutorId, id = degree.Id}, degree);
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdateForTutor([FromRoute] Guid tutorId, [FromRoute] int id,
            [FromBody] UpdateDegreeForTutor updateDegreeForTutor)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            updateDegreeForTutor.Tutor = tutor;
            updateDegreeForTutor.Id = id;
            var (found, errors, updatedDegree) = await _mediator.Send(updateDegreeForTutor);

            if (!found) return NotFound($"Degree with id {id} cannot be found for tutor with id {tutorId}");
            if (errors != null) return BadRequest(errors);

            return Ok(updatedDegree);
        }
    }
}