using MediatR;

namespace TutorService.Application.Features.Tutors.Queries.CheckUserExisting
{
    public class CheckUserExisting : IRequest<bool>
    {
        public string UserId { get; init; } 
    }
}