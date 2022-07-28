using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.GetEnrollmentForCourseAndStudent
{
    public class
        GetEnrollmentForCourseAndStudentHandler : IRequestHandler<GetEnrollmentForCourseAndStudent, EnrollmentVm>
    {
        private readonly IEnrollmentsRepository _enrollmentsRepository;
        private readonly IMapper _mapper;

        public GetEnrollmentForCourseAndStudentHandler(IEnrollmentsRepository enrollmentsRepository, IMapper mapper)
        {
            _enrollmentsRepository =
                enrollmentsRepository ?? throw new ArgumentNullException(nameof(enrollmentsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<EnrollmentVm> Handle(GetEnrollmentForCourseAndStudent request,
            CancellationToken cancellationToken)
        {
            var enrollment = await _enrollmentsRepository.GetForCourseAndStudent(request.CourseId, request.StudentId,
                cancellationToken);

            return _mapper.Map<EnrollmentVm>(enrollment);
        }
    }
}