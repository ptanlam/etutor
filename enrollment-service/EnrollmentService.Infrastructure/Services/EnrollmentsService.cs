using System;
using System.Threading.Tasks;
using EnrollmentService.Application;
using EnrollmentService.Application.Features.Enrollments.Queries.CountEnrollmentsForCourse;
using Grpc.Core;
using MediatR;

namespace EnrollmentService.Infrastructure.Services
{
    public class EnrollmentsService : Enrollments.EnrollmentsBase
    {
        private readonly IMediator _mediator;

        public EnrollmentsService(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public override async Task<CountEnrollmentsForCourseResponse> CountEnrollmentsForCourse(
            CountEnrollmentsForCourseRequest request, ServerCallContext context)
        {
            var numberOfEnrollments = await _mediator.Send(new CountEnrollmentsForCourse {CourseId = request.CourseId});
            return new CountEnrollmentsForCourseResponse {NumberOfEnrollments = numberOfEnrollments};
        }
    }
}