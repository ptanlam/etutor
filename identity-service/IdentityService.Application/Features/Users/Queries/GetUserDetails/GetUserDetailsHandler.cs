using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.Queries.GetClaimsForUser;
using IdentityService.Application.Features.Users.Helper;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUserDetails
{
    public class GetUserDetailsHandler : IRequestHandler<GetUserDetails, UserDetailsVm>
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IRolesRepository _rolesRepository;
        private readonly IConstantsService _constantsService;
        private readonly IFilesService _filesService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public GetUserDetailsHandler(
            IUsersRepository usersRepository,
            IRolesRepository rolesRepository,
            IConstantsService constantsService,
            IFilesService filesService,
            IMapper mapper,
            IMediator mediator)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _rolesRepository = rolesRepository ?? throw new ArgumentNullException(nameof(rolesRepository));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task<UserDetailsVm> Handle(GetUserDetails request, CancellationToken cancellationToken)
        {
            var user = await _usersRepository.GetById(request.Id);

            var userDetailsVm = _mapper.Map<UserDetailsVm>(user);

            var claims = (await _mediator.Send(new GetClaimListForUser {UserId = user.UserId}, cancellationToken))
                .ToList();

            var genderId = claims.FirstOrDefault(c => c.Name == "genderId")?.Value;
            userDetailsVm.Gender = await _constantsService.GetGenderById(genderId);
            userDetailsVm.Roles = await _rolesRepository.PagedListForUser(user.UserId);
            userDetailsVm.AvatarUrl = (await _filesService.GetFileListForOwner(user.UserId)).FirstOrDefault()?.Url ??
                                      string.Empty;

            UserHelper.AssignClaimsToUser(userDetailsVm, claims);
            return userDetailsVm;
        }
    }
}