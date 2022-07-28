using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Tutors.Helper;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Application.Shared.Requests;
using TutorService.Application.Shared.Responses;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorPagedList
{
    public class GetTutorPagedListHandler : IRequestHandler<GetTutorPagedList,
        (List<ValidationFailure> errors, PagedList<TutorVm> tutorList)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IMapper _mapper;
        private readonly IFilesService _filesService;
        private readonly IValidator<GetTutorPagedList> _validator;
        private readonly ICoursesService _coursesService;
        private readonly IIdentitiesService _identitiesService;

        public GetTutorPagedListHandler(
            IMapper mapper,
            ITutorsRepository tutorsRepository,
            IFilesService filesService,
            IValidator<GetTutorPagedList> validator,
            ICoursesService coursesService,
            IIdentitiesService identitiesService)
        {
            _tutorsRepository = tutorsRepository ??
                                throw new ArgumentNullException(nameof(tutorsRepository));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));

            _validator = validator ?? throw new ArgumentNullException(nameof(validator));

            _coursesService = coursesService ??
                              throw new ArgumentNullException(nameof(coursesService));

            _identitiesService = identitiesService ??
                                 throw new ArgumentNullException(nameof(identitiesService));
        }

        public async Task<(List<ValidationFailure> errors, PagedList<TutorVm> tutorList)> Handle(
            GetTutorPagedList request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var userList = (await _identitiesService.GetUserIdsByConditions(request.Name, request.GenderId)).ToList();
            if (!userList.Any())
                return (null, new PagedList<TutorVm>(new List<TutorVm>(), request.PageNumber, request.PageSize));

            var tutorIdList = await GetTutorIdListByConditions(
                request.SubjectName,
                request.EducationalLevelId,
                request.EducationalGradeId);

            var tutorList = await _tutorsRepository.ListByConditionsAsync(
                tutorIdList.ToList(),
                userList.Select(u => u.Id).ToList());

            var tutorVmPagedList = await GetTutorVmPagedList(request, userList, tutorList);
            return (null, tutorVmPagedList);
        }

        private async Task<PagedList<TutorVm>> GetTutorVmPagedList(
            GetPagedList request,
            IReadOnlyCollection<GetUserDetailsResponse> userList,
            List<Tutor> tutorList)
        {
            var tutorPagedList = _mapper.Map<List<TutorVm>>(tutorList);
            var tutorVmPagedList = new PagedList<TutorVm>(tutorPagedList, request.PageNumber, request.PageSize);

            foreach (var tutorVm in tutorVmPagedList.ToList())
            {
                tutorVm.Images = await _filesService.GetImageListForOwner(tutorVm.Id.ToString());
                var userDetails = userList.FirstOrDefault(u => u.Id == tutorVm.UserId);
                TutorHelper.AssignUserDetailsToTutor(tutorVm, userDetails);
            }

            return tutorVmPagedList;
        }

        private async Task<IEnumerable<string>> GetTutorIdListByConditions(
            string subjectName,
            string educationalLevelId,
            string educationalGradeId)
        {
            if (string.IsNullOrEmpty(subjectName)
                && string.IsNullOrEmpty(educationalLevelId)
                && string.IsNullOrEmpty(educationalGradeId)) return new List<string>();

            var tutorIdList = await _coursesService.GetTutorsByConditions(
                subjectName,
                educationalLevelId,
                educationalGradeId);

            return tutorIdList;
        }
    }
}