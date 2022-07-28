using System;
using System.Threading.Tasks;
using CourseService.Application.Features.Subjects.Commands.AddNewSubject;
using CourseService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using MediatR;

namespace CourseService.Infrastructure.IntegrationMessages.Consumers
{
    public class AddSubjectForTutorConsumer : IConsumer<AddSubjectForTutorCommand>
    {
        private readonly IMediator _mediator;
        
        public AddSubjectForTutorConsumer(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        
        public async Task Consume(ConsumeContext<AddSubjectForTutorCommand> context)
        {
            var tutorId = context.Message.TutorId;
            var subjectList = context.Message.Subjects;

            foreach (var subject in subjectList)
            {
                await _mediator.Send(new AddNewSubject
                {
                    TutorId = tutorId,
                    Name = subject.Name,
                    EducationalLevelId = subject.EducationalLevelId,
                    EducationalGradeId = subject.EducationalGradeId
                });
            }
        }
    }
}