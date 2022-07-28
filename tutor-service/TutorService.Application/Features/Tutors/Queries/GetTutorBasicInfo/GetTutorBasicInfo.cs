using System;
using MediatR;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorBasicInfo
{
    public class GetTutorBasicInfo : IRequest<GetTutorBasicInfoResponse>
    {
        public Guid Id { get; init; }
    }
}