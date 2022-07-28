using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EnrollmentService.Application.Contracts.Infrastructure;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using EnrollmentService.Domain.EnrollmentAggregate;
using EnrollmentService.Domain.ValueObjects;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Commands.CreateNewEnrollment
{
    public class CreateNewEnrollmentHandler : IRequestHandler<CreateNewEnrollment,
        (List<ValidationFailure> errors, string errorMessage, EnrollmentVm enrollment)>
    {
        private readonly IEnrollmentsRepository _enrollmentsRepository;
        private readonly IValidator<CreateNewEnrollment> _validator;
        private readonly ICoursesService _coursesService;
        private readonly ISessionsService _sessionsService;
        private readonly IMapper _mapper;
        private readonly IMessagingService _messagingService;

        public CreateNewEnrollmentHandler(IEnrollmentsRepository enrollmentsRepository, IMapper mapper,
            IMessagingService messagingService, IValidator<CreateNewEnrollment> validator,
            ICoursesService coursesService, ISessionsService sessionsService)
        {
            _enrollmentsRepository =
                enrollmentsRepository ?? throw new ArgumentNullException(nameof(enrollmentsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _coursesService = coursesService ?? throw new ArgumentNullException(nameof(coursesService));
            _sessionsService = sessionsService ?? throw new ArgumentNullException(nameof(sessionsService));
        }

        public async Task<(List<ValidationFailure> errors, string errorMessage, EnrollmentVm enrollment)> Handle(
            CreateNewEnrollment request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, string.Empty, null);

            request.StartDate = request.StartDate.ToUniversalTime();
            request.EndDate = request.EndDate.ToUniversalTime();

            var errorMessage = await CheckOverlappingSession(request);
            if (!string.IsNullOrEmpty(errorMessage)) return (null, errorMessage, null);

            var enrollment = await InitiateEnrollment(request);
            if (enrollment == null) return (null, "Out of slots", null);

            await _enrollmentsRepository.AddAsync(enrollment);
            await CreateSessionsForStudent(request, enrollment);

            return (null, string.Empty, _mapper.Map<EnrollmentVm>(enrollment));
        }

        private async Task<Enrollment> InitiateEnrollment(CreateNewEnrollment request)
        {
            //* one-on-one type does not have pre-created course
            if (string.IsNullOrEmpty(request.CourseId))
            {
                request.CourseId = await _coursesService.CreateOneOnOneCourse(new CreateOneOnOneCourseRequest
                {
                    TutorId = request.TutorId,
                    SubjectId = request.SubjectId,
                    StartDate = request.StartDate.ToString(CultureInfo.InvariantCulture),
                    EndDate = request.EndDate.ToString(CultureInfo.InvariantCulture),
                    LearningDays = request.LearningDays,
                    TuitionFeeAmount = (double) request.TuitionAmount,
                    TuitionFeeUnit = request.TuitionUnit
                });

                await _messagingService.CreateNewTransaction(request.StudentId, request.TutorId, "Tutor",
                    request.TuitionAmount, request.TuitionUnit, "Rent");
            }
            else
            {
                //* check remaining slots
                var course = await _coursesService.GetCourseById(request.CourseId);
                var numberOfEnrollments = await _enrollmentsRepository.CountForCourseAsync(request.CourseId);
                if (course.MaxNumberOfStudents <= numberOfEnrollments) return null;

                await _messagingService.CreateNewTransaction(request.StudentId, course.Id, "Course",
                    request.TuitionAmount, request.TuitionUnit, "Enroll");
            }

            return new Enrollment(request.CourseId, request.StudentId,
                new Money(request.TuitionAmount, request.TuitionUnit), request.StartDate, request.EndDate);
        }

        private async Task CreateSessionsForStudent(CreateNewEnrollment request, Enrollment enrollment)
        {
            await _messagingService.AssignRoleForStudent(request.StudentId);

            await _messagingService.CreateSessionsForStudent(
                request.StudentId,
                enrollment.Id.ToString(),
                enrollment.CourseId,
                request.StartDate.ToUnixTimeMilliseconds(),
                request.EndDate.ToUnixTimeMilliseconds(),
                $"{request.StartDate.Hour}:{request.StartDate.Minute}",
                $"{request.EndDate.Hour}:{request.EndDate.Minute}",
                request.LearningDays);
        }

        private async Task<string> CheckOverlappingSession(CreateNewEnrollment command)
        {
            var request = new CheckOverlappingSessionRequest
            {
                StartDate = command.StartDate.ToUnixTimeMilliseconds(),
                EndDate = command.EndDate.ToUnixTimeMilliseconds(),
                StartAt = $"{command.StartDate.Hour}:{command.StartDate.Minute}",
                EndAt = $"{command.EndDate.Hour}:{command.EndDate.Minute}",
                LearningDays = command.LearningDays,
                OwnerId = command.TutorId
            };

            var hasOverlappingSession = await _sessionsService.CheckOverlappingSessions(request);
            if (hasOverlappingSession) return "Tutor is not available during this time";

            request.OwnerId = command.StudentId;
            hasOverlappingSession = await _sessionsService.CheckOverlappingSessions(request);
            return hasOverlappingSession ? "Tutor is not available during this time" : string.Empty;
        }
    }
}