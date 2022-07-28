using MediatR;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Application.Shared.Requests;
using TutorService.Application.Shared.Responses;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorPagedListForAdmin
{
    public class GetTutorPagedListForAdmin : GetPagedList, IRequest<PagedList<TutorVm>>
    {
        public bool IsActive { get; init; }
    }
}