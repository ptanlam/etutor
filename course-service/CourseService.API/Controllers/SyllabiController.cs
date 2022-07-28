using System;
using System.Threading.Tasks;
using CourseService.Application.Features.Courses.Queries.GetCourseById;
using CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse;
using CourseService.Application.Features.Syllabi.Commands.UpdateSyllabus;
using CourseService.Domain.CourseAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CourseService.API.Controllers
{
    [ApiController]
    [Route("courses/{courseId:guid}/syllabi")]
    public class SyllabiController : BaseController
    {
        private readonly IMediator _mediator;

        public SyllabiController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromRoute] Guid courseId, 
            [FromForm] AddNewSyllabusToCourse addNewSyllabusToCourse)
        {
            var course = await _mediator.Send(new GetCourseById {Id = courseId});
            if (course == null) return NotFound($"Course with id {courseId} cannot be found.");

            if (course is not OnlineCourse onlineCourse) 
                return BadRequest($"Course with id {courseId} is not an online course");
            
            addNewSyllabusToCourse.Course = onlineCourse;
            var (errors, syllabus) = await _mediator.Send(addNewSyllabusToCourse);
            if (errors != null) return BadRequest(errors);

            return Ok(syllabus);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid courseId, [FromRoute] Guid id, 
            [FromBody] UpdateSyllabus updateSyllabus)
        {
            var course = await _mediator.Send(new GetCourseById() {Id = courseId});
            if (course == null) return NotFound($"Course with id {courseId} cannot be found.");

            if (course is not OnlineCourse onlineCourse) 
                return BadRequest($"Course with id {courseId} is not an online course");
            
            updateSyllabus.Course = onlineCourse;
            var (found, errors, syllabus) = await _mediator.Send(updateSyllabus);
            if (!found) return NotFound($"Syllabus with id {id} cannot be found.");
            if (errors != null) return BadRequest(errors);

            return Ok(syllabus);
        }
    }
}