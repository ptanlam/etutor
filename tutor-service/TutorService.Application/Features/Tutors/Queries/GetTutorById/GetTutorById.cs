using System;
using MediatR;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorById
{
    public class GetTutorById : IRequest<Tutor>
    {
        public Guid Id { get; init; }
    }
}