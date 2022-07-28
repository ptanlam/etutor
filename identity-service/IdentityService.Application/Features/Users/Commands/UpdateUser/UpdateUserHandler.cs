using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using FluentValidation;
using FluentValidation.Results;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.Commands.UpdateUserClaim;
using IdentityService.Application.Features.Users.Queries.GetUserDetails;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserHandler : IRequestHandler<UpdateUser, (IEnumerable<ValidationFailure> errors, UserDetailsVm
        userDetailsVm)>
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IRolesRepository _rolesRepository;
        private readonly IMessagingService _messagingService;
        private readonly IValidator<UpdateUser> _validator;
        private readonly IMediator _mediator;

        public UpdateUserHandler(IUsersRepository usersRepository, IRolesRepository rolesRepository,
            IMessagingService messagingService, IValidator<UpdateUser> validator, IMediator mediator)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _rolesRepository = rolesRepository ?? throw new ArgumentNullException(nameof(rolesRepository));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task<(IEnumerable<ValidationFailure> errors, UserDetailsVm userDetailsVm)> Handle(
            UpdateUser request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var user = await _usersRepository.Update(request.Id, request.FirstName, request.LastName,
                request.MiddleName, cancellationToken);

            await UpdateTutorFullName(user);

            await UpdateClaims(request, cancellationToken);
            return (null, await _mediator.Send(new GetUserDetails {Id = request.Id}, cancellationToken));
        }

        private async Task UpdateTutorFullName(User user)
        {
            var roles = await _rolesRepository.PagedListForUser(user.UserId);
            if (roles.FirstOrDefault(r => r.Name == "etutor-tutor") is null) return;
            await _messagingService.UpdateTutorFullName(user.UserId, user.FullName);
        }

        private async Task UpdateClaims(UpdateUser request, CancellationToken cancellationToken = default)
        {
            var claimUpdateRequests = new List<UpdateUserClaim>
            {
                new() {Name = "genderId", Value = request.GenderId, UserId = request.Id},
                new() {Name = "dateOfBirth", Value = request.DateOfBirth, UserId = request.Id}
            };

            foreach (var updateRequest in claimUpdateRequests)
            {
                await _mediator.Send(updateRequest, cancellationToken);
            }
        }
    }
}