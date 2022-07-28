using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TutorService.Application.Features.Certificates.Commands.AddCertificateForTutor;
using TutorService.Application.Features.Certificates.Commands.UpdateCertificateDateOfIssue;
using TutorService.Application.Features.Certificates.Commands.UpdateCertificateExpiresIn;
using TutorService.Application.Features.Certificates.Commands.UpdateCertificateForTutor;
using TutorService.Application.Features.Certificates.Queries.GetCertificateDetailsForTutor;
using TutorService.Application.Features.Tutors.Queries.GetTutorById;

namespace TutorService.API.Controllers
{
    [ApiController]
    [Route("tutors/{tutorId:guid}/certificates")]
    public class CertificatesController : BaseController
    {
        private readonly IMediator _mediator;

        public CertificatesController(IMediator mediator)
        {
            _mediator = mediator ??
                        throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("{id:int}", Name = "GetCertificateDetails")]
        public async Task<IActionResult> GetByIdForTutor(
            [FromRoute] int id,
            [FromRoute] Guid tutorId)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null)
                return NotFound($"Tutor with id {tutorId} cannot be found");

            var certificate =
                await _mediator.Send(new GetCertificateDetailsForTutor
                {
                    Tutor = tutor,
                    Id = id
                });

            if (certificate == null)
                return NotFound($"Certificate with id {id} cannot be found " +
                                $"in tutor with id {tutorId}");

            return Ok(certificate);
        }

        [HttpPost]
        public async Task<IActionResult> AddForTutor([FromRoute] Guid tutorId,
            [FromForm] AddCertificateForTutor addCertificateForTutor)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found.");

            addCertificateForTutor.Tutor = tutor;
            var (errors, certificate) = await _mediator.Send(addCertificateForTutor);
            if (errors != null) return BadRequest(errors);

            return CreatedAtRoute(
                "GetCertificateDetails",
                new {id = certificate.Id, tutorId},
                certificate);
        }


        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdateForTutor([FromRoute] int id,
            [FromRoute] Guid tutorId,
            [FromBody] UpdateCertificateForTutor updateCertificateForTutor)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            updateCertificateForTutor.Tutor = tutor;
            updateCertificateForTutor.Id = id;

            var (found, errors, updatedCertificate) =
                await _mediator.Send(updateCertificateForTutor);

            if (!found)
                return NotFound($"Certificate with id {id} cannot be " +
                                $"found in tutor with id {tutorId}");

            if (errors != null) return BadRequest(errors);

            return Ok(updatedCertificate);
        }

        [HttpPatch("{id:int}/date-of-issue")]
        public async Task<IActionResult> UpdateDateOfIssue([FromRoute] int id,
            [FromRoute] Guid tutorId,
            [FromBody] UpdateCertificateDateOfIssue updateCertificateDateOfIssue)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            updateCertificateDateOfIssue.Tutor = tutor;
            updateCertificateDateOfIssue.Id = id;

            var (found, errors, updatedCertificate) =
                await _mediator.Send(updateCertificateDateOfIssue);

            if (!found)
                return NotFound($"Certificate with id {id} cannot be " +
                                $"found in tutor with id {tutorId}");

            if (errors != null) return BadRequest(errors);

            return Ok(updatedCertificate);
        }

        [HttpPatch("{id:int}/expires-in")]
        public async Task<IActionResult> UpdateExpiresIn([FromRoute] int id,
            [FromRoute] Guid tutorId,
            [FromBody] UpdateCertificateExpiresIn updateCertificateExpiresIn)
        {
            var tutor = await _mediator.Send(new GetTutorById {Id = tutorId});
            if (tutor == null) return NotFound($"Tutor with id {tutorId} cannot be found");

            updateCertificateExpiresIn.Tutor = tutor;
            updateCertificateExpiresIn.Id = id;

            var (found, errors, updatedCertificate) =
                await _mediator.Send(updateCertificateExpiresIn);

            if (!found)
                return NotFound($"Certificate with id {id} cannot be " +
                                $"found in tutor with id {tutorId}");
            if (errors != null) return BadRequest(errors);

            return Ok(updatedCertificate);
        }
    }
}