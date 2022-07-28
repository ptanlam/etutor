using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Tutors.Helper;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Application.Shared.Responses;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorPagedListForAdmin
{
    public class GetTutorPagedListHandlerForAdmin : IRequestHandler<GetTutorPagedListForAdmin, PagedList<TutorVm>>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IIdentitiesService _identitiesService;
        private readonly IFilesService _filesService;
        private readonly IMapper _mapper;

        public GetTutorPagedListHandlerForAdmin(
            ITutorsRepository tutorsRepository,
            IIdentitiesService identitiesService,
            IFilesService filesService,
            IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _identitiesService = identitiesService ?? throw new ArgumentNullException(nameof(identitiesService));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PagedList<TutorVm>> Handle(
            GetTutorPagedListForAdmin request,
            CancellationToken cancellationToken)
        {
            var tutorList = await _tutorsRepository.ListAsyncForAdmin(request.IsActive);

            var tutorVmList = _mapper.Map<List<TutorVm>>(tutorList);
            var tutorVmPagedList = new PagedList<TutorVm>(tutorVmList, request.PageNumber, request.PageSize);

            foreach (var tutorVm in tutorVmList)
            {
                var userDetails = await _identitiesService.GetUserDetails(tutorVm.UserId);
                tutorVm.Images = await _filesService.GetImageListForOwner(tutorVm.Id.ToString());
                TutorHelper.AssignUserDetailsToTutor(tutorVm, userDetails);
            }

            return tutorVmPagedList;
        }
    }
}