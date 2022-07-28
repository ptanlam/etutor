using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.Enums;
using CourseService.Domain.ValueTypes;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Features.Courses.Commands.AddNewCourse
{
    public class AddNewCourseHandler : IRequestHandler<AddNewCourse,
        (List<ValidationFailure> errors, bool hasSession, CourseVm course)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IValidator<AddNewCourse> _validator;
        private readonly IMessagingService _messagingService;
        private readonly ISessionsService _sessionsService;
        private readonly IMapper _mapper;

        public AddNewCourseHandler(
            ICoursesRepository coursesRepository,
            IMapper mapper,
            IValidator<AddNewCourse> validator,
            IMessagingService messagingService,
            ISessionsService sessionsService)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
            _sessionsService = sessionsService ?? throw new ArgumentNullException(nameof(sessionsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, bool hasSession, CourseVm course)>
            Handle(AddNewCourse request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, false, null);
            
            request.StartDate = request.StartDate.ToUniversalTime();
            request.EndDate = request.EndDate.ToUniversalTime();

            var hasSession = await _sessionsService.HasSessionInPeriod(
                request.TutorId,
                string.Join(',', request.LearningDays), 
                request.StartDate,
                request.EndDate, 
                $"{request.StartDate.Hour}:{request.StartDate.Minute}",
                $"{request.EndDate.Hour}:{request.EndDate.Minute}");
            if (hasSession) return (null, true, null);

            var course = CreateCourse(request);
            await _coursesRepository.AddAsync(course);
            
            var courseVm = _mapper.Map<CourseVm>(course);
            await SendMessageToExternalServices(request, course, courseVm);
            
            return (null, false, _mapper.Map<CourseVm>(course));
        }

        private async Task SendMessageToExternalServices(AddNewCourse request, Course course, CourseVm courseVm)
        {
            if (request.Thumbnail != null)
            {
                await _messagingService.UploadFileList(course.Id.ToString(), new FormFileCollection
                {
                    request.Thumbnail
                });
            }

            await _messagingService.CreateSessions(
                courseVm.Id,
                request.TutorId,
                courseVm.StartDate.ToUnixTimeMilliseconds(),
                courseVm.EndDate.ToUnixTimeMilliseconds(),
                courseVm.StartAt,
                courseVm.EndAt,
                courseVm.LearningDays);
        }

        private static Course CreateCourse(AddNewCourse request)
        {
            var tuitionFee = new Money(request.TuitionFeeAmount, request.TuitionFeeUnit);
            var courseType = Enum.Parse<CourseType>(request.Type, true);
            var learningDays = string.Join(',', request.LearningDays);

            return courseType switch
            {
                CourseType.Online => new OnlineCourse(
                    request.Name, 
                    request.Description,
                    request.StartDate,
                    request.EndDate,
                    learningDays,
                    request.StartDate.Hour,
                    request.StartDate.Minute,
                    request.EndDate.Hour,
                    request.EndDate.Minute,
                    tuitionFee, 
                    request.SubjectId,
                    request.MaxNumberOfStudents, 
                    CreateSyllabi(request.Syllabi)),

                CourseType.OneOnOne => new OneOnOneCourse(
                    request.StartDate,
                    request.EndDate,
                    learningDays, 
                    request.StartDate.Hour,
                    request.StartDate.Minute,
                    request.EndDate.Hour,
                    request.EndDate.Minute,
                    tuitionFee,
                    request.SubjectId),

                _ => null
            };
        }

        private static IEnumerable<Syllabus> CreateSyllabi(IEnumerable<AddNewSyllabus> addNewSyllabi)
        {
            if (addNewSyllabi == null) return new List<Syllabus>();
        
            return addNewSyllabi.Aggregate(new List<Syllabus>(), (syllabi, addNewSyllabus) =>
            {
                syllabi.Add(new Syllabus(
                    addNewSyllabus.Title, 
                    addNewSyllabus.Description, 
                    addNewSyllabus.Achievements,
                    addNewSyllabus.FromDate,
                    addNewSyllabus.ToDate));
                
                return syllabi;
            });
        }
    }
}