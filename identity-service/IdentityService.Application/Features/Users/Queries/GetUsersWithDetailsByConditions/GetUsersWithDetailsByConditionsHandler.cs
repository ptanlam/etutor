using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using AutoMapper;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.Queries.GetClaimsForUser;
using IdentityService.Application.Features.Users.Helper;
using IdentityService.Application.Features.Users.ViewModels;
using LinqKit;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUsersWithDetailsByConditions
{
    public class
        GetUsersWithDetailsByConditionsHandler : IRequestHandler<GetUsersWithDetailsByConditions,
            IEnumerable<UserDetailsVm>>
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMediator _mediator;
        private readonly IConstantsService _constantsService;
        private readonly IMapper _mapper;

        public GetUsersWithDetailsByConditionsHandler(IUsersRepository usersRepository, IMediator mediator,
            IConstantsService constantsService, IMapper mapper)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<UserDetailsVm>> Handle(GetUsersWithDetailsByConditions request,
            CancellationToken cancellationToken)
        {
            var users = await _usersRepository.GetPagedList();
            if (!users.Any()) return new List<UserDetailsVm>();

            var userDetailsVmList = await FetchUsersWithClaims(users.ToList(), request.GenderId, cancellationToken);

            var predicate = PredicateBuilder.New<UserDetailsVm>();

            if (!string.IsNullOrEmpty(request.Name))
                predicate.And(u => u.FullName.Contains(request.Name, StringComparison.CurrentCultureIgnoreCase));

            return userDetailsVmList.Where(predicate.Compile());
        }

        private async Task<List<UserDetailsVm>> FetchUsersWithClaims(List<User> users, string genderId,
            CancellationToken cancellationToken)
        {
            var userDetailsVmList = new List<UserDetailsVm>();

            foreach (var user in users)
            {
                var claims = (await _mediator.Send(
                    new GetClaimListForUser {UserId = user.UserId}, cancellationToken)).ToList();

                var userGenderId = claims.FirstOrDefault(c => c.Name == "genderId")?.Value;

                if (!string.IsNullOrEmpty(genderId) && userGenderId != genderId) continue;

                var userDetailsVm = _mapper.Map<UserDetailsVm>(user);
                userDetailsVm.Gender = await GetGenderById(userGenderId);

                UserHelper.AssignClaimsToUser(userDetailsVm, claims);

                userDetailsVmList.Add(userDetailsVm);
            }

            return userDetailsVmList;
        }

        private async Task<string> GetGenderById(string genderId)
        {
            if (string.IsNullOrEmpty(genderId)) return string.Empty;
            return await _constantsService.GetGenderById(genderId);
        }
    }
}