using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.GetEnrollmentsForCourse
{
    public class GetEnrollmentsForCourseHandler :
        IRequestHandler<GetEnrollmentsForCourse, IEnumerable<EnrollmentVm>>
    {
        private readonly IEnrollmentsRepository _enrollmentsRepository;
        private readonly IMapper _mapper;

        public GetEnrollmentsForCourseHandler(IEnrollmentsRepository enrollmentsRepository,
            IMapper mapper)
        {
            _enrollmentsRepository = enrollmentsRepository ??
                throw new ArgumentNullException(nameof(enrollmentsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<EnrollmentVm>> Handle(GetEnrollmentsForCourse request,
            CancellationToken cancellationToken)
        {
            var enrollmentList = await _enrollmentsRepository.ListForCourse(request.CourseId);
            return _mapper.Map<IEnumerable<EnrollmentVm>>(enrollmentList);
        }
    }
}