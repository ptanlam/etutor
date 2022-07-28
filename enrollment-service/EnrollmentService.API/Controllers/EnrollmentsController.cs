using System;
using System.Threading;
using System.Threading.Tasks;
using EnrollmentService.API.Constants;
using EnrollmentService.Application.Features.Enrollments.Commands.CreateNewEnrollment;
using EnrollmentService.Application.Features.Enrollments.Queries.GetEnrollmentForCourseAndStudent;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnrollmentService.API.Controllers
{
    [ApiController]
    [Route("enrollments")]
    public class EnrollmentsController : BaseController
    {
        private readonly IMediator _mediator;

        public EnrollmentsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IActionResult> GetForCourseAndStudent(
            [FromQuery] GetEnrollmentForCourseAndStudent getEnrollmentForCourseAndStudent,
            CancellationToken cancellationToken)
        {
            var enrollment = await _mediator.Send(getEnrollmentForCourseAndStudent, cancellationToken);
            return Ok(enrollment);
        }

        [HttpPost]
        [Authorize(AuthorizationPolicies.CanCreateEnrollments)]
        public async Task<IActionResult> Create([FromForm] CreateNewEnrollment createNewEnrollment)
        {
            var (errors, errorMessage, enrollment) = await _mediator.Send(createNewEnrollment);

            if (errors != null) return BadRequest(errors);
            if (!string.IsNullOrEmpty(errorMessage)) return BadRequest(errorMessage);

            return Ok(enrollment);
        }
    }
}