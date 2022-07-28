using System;
using System.Threading;
using System.Threading.Tasks;
using CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubject;
using CourseService.Application.Features.Subjects.Commands.AddNewSubject;
using CourseService.Application.Features.Subjects.Commands.UpdateSubject;
using CourseService.Application.Features.Subjects.Queries.GetSubjectById;
using CourseService.Application.Features.Subjects.Queries.GetSubjectDetails;
using CourseService.Application.Features.Subjects.Queries.GetSubjectListForTutor;
using CourseService.Application.Features.Subjects.Queries.GetSubjectNameList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CourseService.API.Controllers
{
    [ApiController]
    [Route("subjects")]
    public class SubjectsController : BaseController
    {
        private readonly IMediator _mediator;

        public SubjectsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IActionResult> GetPagedList(
            [FromQuery] GetSubjectListForTutor getSubjectListForTutor)
        {
            var subjectList = await _mediator.Send(getSubjectListForTutor);
            return Ok(subjectList);
        }

        [HttpGet("name")]
        public async Task<IActionResult> NameList([FromQuery] GetSubjectNameList getSubjectNameList,
            CancellationToken cancellationToken)
        {
            var (errors, nameList) = await _mediator.Send(getSubjectNameList, cancellationToken);
            if (errors != null) return BadRequest(errors);

            return Ok(nameList);
        }

        [HttpGet("{id:guid}", Name = "GetSubjectDetails")]
        public async Task<IActionResult> Details([FromRoute] GetSubjectDetails getSubjectDetails)
        {
            var subject = await _mediator.Send(getSubjectDetails);
            if (subject == null) return NotFound($"Subject with id {getSubjectDetails.Id} cannot be found.");
            return Ok(subject);
        }

        [HttpGet("{id:guid}/courses")]
        public async Task<IActionResult> Courses([FromRoute] GetSubjectDetails getSubjectDetails,
            [FromQuery] GetCoursePagedListForSubject getCoursePagedListForSubject)
        {
            var subject = await _mediator.Send(getSubjectDetails);
            if (subject == null) return NotFound($"Subject with id {getSubjectDetails.Id} cannot be found.");

            getCoursePagedListForSubject.Subject = subject;
            var courseList = await _mediator.Send(getCoursePagedListForSubject);
            return Ok(courseList);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddNewSubject addNewSubject)
        {
            var (errors, subject) = await _mediator.Send(addNewSubject);
            if (errors != null) return BadRequest(errors);
            return CreatedAtRoute("GetSubjectDetails", new {id = subject.Id}, subject);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] GetSubjectById getSubjectById,
            [FromBody] UpdateSubject updateSubject)
        {
            var subject = await _mediator.Send(getSubjectById);
            if (subject == null) return NotFound($"Subject with id {getSubjectById.Id} cannot be found!");

            updateSubject.Subject = subject;
            var (errors, updatedSubject) = await _mediator.Send(updateSubject);
            if (errors != null) return BadRequest(errors);
            return Ok(updatedSubject);
        }
    }
}