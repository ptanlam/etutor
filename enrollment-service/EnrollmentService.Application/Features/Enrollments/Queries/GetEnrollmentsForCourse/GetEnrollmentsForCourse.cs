using System.Collections.Generic;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.GetEnrollmentsForCourse
{
    public class GetEnrollmentsForCourse : IRequest<IEnumerable<EnrollmentVm>>
    {
        public string CourseId { get; init; }
    }
}