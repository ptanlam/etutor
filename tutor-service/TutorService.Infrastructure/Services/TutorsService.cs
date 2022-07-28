using System;
using System.Threading.Tasks;
using Grpc.Core;
using MediatR;
using TutorService.Application;
using TutorService.Application.Features.Rentals.Queries.GetActiveRentalForTutor;
using TutorService.Application.Features.Tutors.Queries.GetTutorBasicInfo;

namespace TutorService.Infrastructure.Services
{
    public class TutorsService : Tutors.TutorsBase
    {
        private readonly IMediator _mediator;

        public TutorsService(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public override async Task<GetTutorBasicInfoResponse> GetTutorBasicInfo(
            GetTutorBasicInfoRequest request, 
            ServerCallContext context)
        {
            var isValid = Guid.TryParse(request.Id, out var tutorId);
            if (!isValid) return new GetTutorBasicInfoResponse();
            
            return await _mediator.Send(new GetTutorBasicInfo {Id = tutorId});
        }

        public override async Task<GetTutorActiveRentalResponse> GetTutorActiveRental(
            GetTutorActiveRentalRequest request, 
            ServerCallContext context)
        {
            var isValid = Guid.TryParse(request.TutorId, out var tutorId);
            if (!isValid) return new GetTutorActiveRentalResponse();
            
            return await _mediator.Send(new GetActiveRentalForTutor {TutorId = tutorId});
        }
    }
}