using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Application.Features.Tutors.Helper;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorDetails
{
    public class GetTutorDetailsHandler : IRequestHandler<GetTutorDetails, TutorDetailsVm>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IFilesService _filesService;
        private readonly IIdentitiesService _identitiesService;
        private readonly IConstantsService _constantsService;
        private readonly IMapper _mapper;

        public GetTutorDetailsHandler(ITutorsRepository tutorsRepository, IFilesService filesService,
            IIdentitiesService identitiesService, IConstantsService constantsService, IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _identitiesService = identitiesService ?? throw new ArgumentNullException(nameof(identitiesService));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<TutorDetailsVm> Handle(GetTutorDetails request, CancellationToken cancellationToken)
        {
            if (request.Id == null && string.IsNullOrEmpty(request.UserId)) return null;

            Tutor tutor;

            if (request.Id != null) tutor = await _tutorsRepository.GetByIdAsync((Guid) request.Id);
            else tutor = await _tutorsRepository.GetForUserAsync(request.UserId);
            if (tutor == null) return null;

            var tutorDetailsVm = _mapper.Map<TutorDetailsVm>(tutor);
            tutorDetailsVm.Images = await _filesService.GetImageListForOwner(tutor.Id.ToString());
            tutorDetailsVm.Degrees = await GetDegreeVmList(tutor.Degrees);
            tutorDetailsVm.Certificates = await GetCertificateVmList(tutor.Certificates);

            var userDetails = await _identitiesService.GetUserDetails(tutor.UserId);
            TutorHelper.AssignUserDetailsToTutor(tutorDetailsVm, userDetails);

            return tutorDetailsVm;
        }

        private async Task<IEnumerable<DegreeVm>> GetDegreeVmList(IEnumerable<Degree> degrees)
        {
            return await Task.WhenAll(degrees.Select(async degree =>
            {
                var degreeVm = _mapper.Map<DegreeVm>(degree);
                degreeVm.AcademicRank = await _constantsService.GetAcademicRankById(degree.AcademicRankId);
                degreeVm.Image = (await _filesService.GetImageListForOwner(degree.Id.ToString(), "degrees"))
                    .FirstOrDefault();
                return degreeVm;
            }));
        }

        private async Task<IEnumerable<CertificateVm>> GetCertificateVmList(IEnumerable<Certificate> certificates)
        {
            return await Task.WhenAll(certificates.Select(async (cert) =>
            {
                var certificateVm = _mapper.Map<CertificateVm>(cert);
                certificateVm.Image = (await _filesService.GetImageListForOwner(cert.Id.ToString(), "certificates"))
                    .FirstOrDefault();
                return certificateVm;
            }));
        }
    }
}