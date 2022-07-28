using System;
using System.Threading.Tasks;
using CourseService.API.Constants;
using CourseService.Application.Features.Courses.Commands.AddNewCourse;
using CourseService.Application.Features.Courses.Commands.ApproveOneOnOneCourse;
using CourseService.Application.Features.Courses.Commands.SetCourseActiveStatus;
using CourseService.Application.Features.Courses.Commands.UpdateCourse;
using CourseService.Application.Features.Courses.Queries.GetCourseById;
using CourseService.Application.Features.Courses.Queries.GetCourseDetails;
using CourseService.Application.Features.Courses.Queries.GetCoursePagedListForAdmin;
using CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubjectByConditions;
using CourseService.Application.Features.Courses.Queries.GetCoursePagedListForTutorByConditions;
using CourseService.Application.Features.Subjects.Queries.GetSubjectById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseService.API.Controllers
{
    [ApiController]
    [Route("courses")]
    public class CoursesController : BaseController
    {
        private readonly IMediator _mediator;

        public CoursesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IActionResult> GetPagedListForSubject(
            [FromQuery] GetCoursePagedListForSubjectByConditions getCoursePagedListForSubjectByConditions)
        {
            var (errors, courseList) = await _mediator.Send(getCoursePagedListForSubjectByConditions);
            if (errors != null) return BadRequest(errors);
            return Ok(courseList);
        }

        [HttpGet("admin")]
        [Authorize(AuthorizationPolicies.CanReadInactiveCourses)]
        public async Task<IActionResult> GetPagedListForAdmin(
            [FromQuery] GetCoursePagedListForAdmin getCoursePagedListForAdmin)
        {
            var (errors, courseList) = await _mediator.Send(getCoursePagedListForAdmin);
            if (errors != null) return BadRequest(errors);
            return Ok(courseList);
        }

        [HttpGet("tutors/{tutorId}")]
        public async Task<IActionResult> GetPagedListForTutor([FromRoute] string tutorId,
            [FromQuery] GetCoursePagedListForTutorByConditions getCoursePagedListForTutorByConditions)
        {
            var subject = await _mediator.Send(new GetSubjectById
                {Id = getCoursePagedListForTutorByConditions.SubjectId});

            if (subject == null || subject.TutorId != tutorId)
                return NotFound(
                    $"Subject with id {getCoursePagedListForTutorByConditions.SubjectId} cannot be found");

            var courses = await _mediator.Send(getCoursePagedListForTutorByConditions);

            return Ok(courses);
        }

        [HttpGet("{id:guid}", Name = "GetCourseDetails")]
        public async Task<IActionResult> GetDetails([FromRoute] GetCourseDetails getCourseDetails)
        {
            var course = await _mediator.Send(getCourseDetails);
            if (course == null) return NotFound($"Course with id {getCourseDetails.Id} cannot be found.");
            return Ok(course);
        }

        [HttpPost]
        [Authorize(AuthorizationPolicies.CanCreateCourses)]
        public async Task<IActionResult> Add([FromForm] AddNewCourse addNewCourse)
        {
            var subject = await _mediator.Send(new GetSubjectById {Id = addNewCourse.SubjectId});
            if (subject == null) return NotFound($"Subject with id {addNewCourse.SubjectId} cannot be found.");

            addNewCourse.TutorId = subject.TutorId;
            var (errors, hasSession, course) = await _mediator.Send(addNewCourse);
            if (errors != null) return BadRequest(errors);
            if (hasSession) return BadRequest("Overlapping course!");

            return CreatedAtRoute("GetCourseDetails", new {id = course.Id}, course);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] GetCourseById getCourseById,
            [FromBody] UpdateCourse updateCourse)
        {
            var course = await _mediator.Send(getCourseById);
            if (course == null) return NotFound($"Course with id {getCourseById.Id} cannot be found.");

            updateCourse.Course = course;
            var (errors, updatedCourse) = await _mediator.Send(updateCourse);
            if (errors != null) return BadRequest(errors);

            return Ok(updatedCourse);
        }

        [HttpPatch("{id:guid}/is-active")]
        [Authorize(AuthorizationPolicies.CanActivateCourses)]
        public async Task<IActionResult> Activate([FromRoute] Guid id,
            [FromBody] SetCourseActiveStatus setCourseActiveStatus)
        {
            setCourseActiveStatus.Id = id;
            var course = await _mediator.Send(setCourseActiveStatus);
            if (course == null) return NotFound($"Course with id {id} cannot be found.");

            return Ok(course);
        }

        [HttpPatch("{id:guid}/tutor-approved")]
        public async Task<IActionResult> ApproveByTutor([FromRoute] Guid id)
        {
            var course = await _mediator.Send(new GetCourseById {Id = id});
            if (course is null) return NotFound("Course cannot be found");

            var courseVm = await _mediator.Send(new ApproveOneOnOneCourse {Course = course});
            return Ok(courseVm);
        }
    }
}