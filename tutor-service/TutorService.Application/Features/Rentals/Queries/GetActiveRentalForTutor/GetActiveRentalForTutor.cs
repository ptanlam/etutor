using System;
using MediatR;

namespace TutorService.Application.Features.Rentals.Queries.GetActiveRentalForTutor
{
    public class GetActiveRentalForTutor : IRequest<GetTutorActiveRentalResponse>
    {
        public Guid TutorId { get; set; }
    }
}