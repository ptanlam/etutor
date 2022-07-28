using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TutorService.API.Constants;
using TutorService.Application.Features.Tutors.Commands.RegisterNewTutor;
using TutorService.Application.Features.Tutors.Commands.SetTutorActiveStatus;
using TutorService.Application.Features.Tutors.Commands.UnregisterTutor;
using TutorService.Application.Features.Tutors.Commands.UpdateTutorInformation;
using TutorService.Application.Features.Tutors.Queries.CheckUserExisting;
using TutorService.Application.Features.Tutors.Queries.GetTutorById;
using TutorService.Application.Features.Tutors.Queries.GetTutorDetails;
using TutorService.Application.Features.Tutors.Queries.GetTutorNameList;
using TutorService.Application.Features.Tutors.Queries.GetTutorPagedList;
using TutorService.Application.Features.Tutors.Queries.GetTutorPagedListForAdmin;

namespace TutorService.API.Controllers
{
    [ApiController]
    [Route("tutors")]
    public class TutorsController : BaseController
    {
        private readonly IMediator _mediator;

        public TutorsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IActionResult> GetPagedList(
            [FromQuery] GetTutorPagedList getTutorPagedList)
        {
            var (errors, tutorList) = await _mediator.Send(getTutorPagedList);

            if (errors != null) return BadRequest(errors);
            return Ok(tutorList);
        }

        [HttpGet("admin")]
        [Authorize(AuthorizationPolicies.CanReadInactiveTutors)]
        public async Task<IActionResult> GetInactivePagedList(
            [FromQuery] GetTutorPagedListForAdmin getTutorPagedListForAdmin)
        {
            var tutorList = await _mediator.Send(getTutorPagedListForAdmin);
            return Ok(tutorList);
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetNameList([FromQuery] GetTutorNameList getTutorNameList,
            CancellationToken cancellationToken)
        {
            var (errors, nameList) = await _mediator.Send(getTutorNameList, cancellationToken);
            if (errors != null) return BadRequest(errors);

            return Ok(nameList);
        }

        [HttpGet("{id:guid}", Name = "GetTutorDetails")]
        public async Task<IActionResult> GetDetails([FromRoute] GetTutorDetails getTutorDetails)
        {
            var tutor = await _mediator.Send(getTutorDetails);
            if (tutor == null) return NotFound();
            return Ok(tutor);
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetDetailsForUser([FromQuery] GetTutorDetails getTutorDetails)
        {
            var tutor = await _mediator.Send(getTutorDetails);
            if (tutor == null) return NotFound();
            return Ok(tutor);
        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> CheckUserExisting([FromRoute] CheckUserExisting checkUserExisting)
        {
            return Ok(await _mediator.Send(checkUserExisting));
        }

        [HttpPost]
        [Authorize(AuthorizationPolicies.CanCreateTutors)]
        public async Task<IActionResult> Register([FromForm] RegisterNewTutor registerNewTutor)
        {
            var (errors, userExists, tutor) = await _mediator.Send(registerNewTutor);

            if (errors != null) return BadRequest(errors);
            if (!userExists)
                return NotFound($"User with id {registerNewTutor.UserId} cannot be found");

            return CreatedAtRoute("GetTutorDetails", new {id = tutor.Id}, tutor);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id,
            [FromBody] UpdateTutorInformation updateTutorInformation)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = id});
            if (tutor == null) return NotFound();

            updateTutorInformation.Tutor = tutor;
            var (errors, updatedTutor) = await _mediator.Send(updateTutorInformation);
            if (errors != null) return BadRequest(errors);

            return Ok(updatedTutor);
        }

        [HttpPatch("{id:guid}/is-active")]
        [Authorize(AuthorizationPolicies.CanActivateTutors)]
        public async Task<IActionResult> Deactivate([FromRoute] Guid id,
            [FromBody] SetTutorActiveStatus setTutorActiveStatus)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = id});
            if (tutor == null) return NotFound($"Tutor with id {id} cannot be found");

            setTutorActiveStatus.Tutor = tutor;
            var updatedTutor = await _mediator.Send(setTutorActiveStatus);

            return Ok(updatedTutor);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Unregister([FromRoute] Guid id)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = id});
            if (tutor == null) return NotFound($"Tutor with id {id} cannot be found");

            var success = await _mediator.Send(new UnregisterTutor {Tutor = tutor});
            if (!success) return BadRequest("Cannot unregister an active tutor");

            return NoContent();
        }
    }
}