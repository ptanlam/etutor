using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorBasicInfo
{
    public class GetTutorBasicInfoHandler : IRequestHandler<GetTutorBasicInfo, GetTutorBasicInfoResponse>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IMapper _mapper;
        private readonly IFilesService _filesService;
        private readonly IIdentitiesService _identitiesService;

        public GetTutorBasicInfoHandler(ITutorsRepository tutorsRepository, IMapper mapper, IFilesService filesService,
            IIdentitiesService identitiesService)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _identitiesService = identitiesService ?? throw new ArgumentNullException(nameof(identitiesService));
        }

        public async Task<GetTutorBasicInfoResponse> Handle(GetTutorBasicInfo request,
            CancellationToken cancellationToken)
        {
            var tutor = await _tutorsRepository.GetByIdAsync(request.Id);
            if (tutor == null) return new GetTutorBasicInfoResponse();

            var tutorBasicInfo = _mapper.Map<GetTutorBasicInfoResponse>(tutor);

            var images = await _filesService.GetImageListForOwner(tutor.Id.ToString());
            tutorBasicInfo.Images.AddRange(_mapper.Map<List<Image>>(images));

            var userDetails = await _identitiesService.GetUserDetails(tutor.UserId);
            tutorBasicInfo.FirstName = userDetails.FirstName;
            tutorBasicInfo.LastName = userDetails.LastName;
            tutorBasicInfo.FullName = userDetails.FullName;
            tutorBasicInfo.Gender = userDetails.Gender;

            return tutorBasicInfo;
        }
    }
}