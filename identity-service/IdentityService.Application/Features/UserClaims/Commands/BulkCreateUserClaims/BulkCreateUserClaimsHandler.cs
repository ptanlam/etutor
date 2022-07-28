using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.ViewModels;
using IdentityService.Domain.UserAggregate;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Commands.BulkCreateUserClaims
{
    public class BulkCreateUserClaimsHandler : IRequestHandler<BulkCreateUserClaims, IEnumerable<UserClaimVm>>
    {
        private readonly IUserClaimsRepository _userClaimsRepository;
        private readonly IMapper _mapper;

        public BulkCreateUserClaimsHandler(IUserClaimsRepository userClaimsRepository, IMapper mapper)
        {
            _userClaimsRepository = userClaimsRepository ??
                                    throw new ArgumentNullException(nameof(userClaimsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<UserClaimVm>> Handle(BulkCreateUserClaims request,
            CancellationToken cancellationToken)
        {
            var userClaims = new List<UserClaim>
            {
                new(request.UserId, "dateOfBirth", request.DateOfBirth.ToString(CultureInfo.InvariantCulture)),
                new(request.UserId, "genderId", request.GenderId),
                new(request.UserId, "phoneNumber", request.PhoneNumber)
            };

            await _userClaimsRepository.BulkAddAsync(userClaims);
            return _mapper.Map<IEnumerable<UserClaimVm>>(userClaims);
        }
    }
}