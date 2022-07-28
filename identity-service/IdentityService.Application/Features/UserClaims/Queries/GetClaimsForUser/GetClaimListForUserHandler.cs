using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Queries.GetClaimsForUser
{
    public class GetClaimListForUserHandler : IRequestHandler<GetClaimListForUser, IEnumerable<UserClaimVm>>
    {
        private readonly IUserClaimsRepository _userClaimsRepository;
        private readonly IMapper _mapper;

        public GetClaimListForUserHandler(IUserClaimsRepository userClaimsRepository, IMapper mapper)
        {
            _userClaimsRepository =
                userClaimsRepository ?? throw new ArgumentNullException(nameof(userClaimsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<UserClaimVm>> Handle(GetClaimListForUser request,
            CancellationToken cancellationToken)
        {
            var userClaimList = await _userClaimsRepository.GetClaimsForUserAsync(request.UserId);
            return _mapper.Map<IEnumerable<UserClaimVm>>(userClaimList);
        }
    }
}