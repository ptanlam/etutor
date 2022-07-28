using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Grpc.Core;
using IdentityService.Application;
using IdentityService.Application.Features.Users.Queries.CheckUserExisting;
using IdentityService.Application.Features.Users.Queries.GetUserDetails;
using IdentityService.Application.Features.Users.Queries.GetUsersWithDetailsByConditions;
using MediatR;

namespace IdentityService.Infrastructure.Services
{
    public class IdentitiesService : Identities.IdentitiesBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public IdentitiesService(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public override async Task<GetUserDetailsResponse> GetUserDetails(GetUserDetailsRequest request,
            ServerCallContext context)
        {
            var userDetails = await _mediator.Send(new GetUserDetails {Id = request.Id});
            return _mapper.Map<GetUserDetailsResponse>(userDetails);
        }

        public override async Task<GetUsersWithDetailsByConditionsResponse> GetUsersWithDetailsByConditions(
            GetUsersWithDetailsByConditionsRequest request, ServerCallContext context)
        {
            var userList = await _mediator.Send(new GetUsersWithDetailsByConditions
                {Name = request.Name, GenderId = request.GenderId});

            var response = new GetUsersWithDetailsByConditionsResponse();
            response.Users.AddRange(_mapper.Map<IEnumerable<GetUserDetailsResponse>>(userList));

            return response;
        }

        public override async Task<CheckUserExistingResponse> CheckUserExisting(GetUserDetailsRequest request,
            ServerCallContext context)
        {
            return await _mediator.Send(new CheckUserExisting {Id = request.Id});
        }
    }
}