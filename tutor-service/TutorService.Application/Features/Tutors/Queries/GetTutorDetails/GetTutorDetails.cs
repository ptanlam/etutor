using System;
using MediatR;
using TutorService.Application.Features.Tutors.ViewModels;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorDetails
{
    public class GetTutorDetails : IRequest<TutorDetailsVm>
    {
        public Guid? Id { get; init; }
        public string UserId { get; init; }
    }
}