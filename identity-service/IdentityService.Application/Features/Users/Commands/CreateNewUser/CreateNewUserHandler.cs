using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.UserClaims.Commands.BulkCreateUserClaims;
using IdentityService.Application.Features.Users.Helper;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;
using IdentityService.Application.Features.Roles.Commands.AssignRoleForUser;
using IdentityService.Domain.Enums;

namespace IdentityService.Application.Features.Users.Commands.CreateNewUser
{
    public class CreateNewUserHandler : IRequestHandler<CreateNewUser, (List<ValidationFailure> errors,
        UserDetailsVm user)>
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMediator _mediator;
        private readonly IValidator<CreateNewUser> _validator;
        private readonly IMapper _mapper;

        public CreateNewUserHandler(IUsersRepository usersRepository, IMediator mediator,
            IValidator<CreateNewUser> validator, IMapper mapper)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(List<ValidationFailure> errors, UserDetailsVm user)> Handle(
            CreateNewUser request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var user = await _usersRepository.Register(request.Email, request.Password, request.FirstName,
                request.LastName, request.MiddleName);

            await _mediator.Send(new AssignRoleForUser {UserId = user.UserId, Role = ApplicationRole.User},
                cancellationToken);

            var claims = await _mediator.Send(new BulkCreateUserClaims
            {
                UserId = user.UserId,
                GenderId = request.GenderId,
                PhoneNumber = request.PhoneNumber,
                DateOfBirth = request.DateOfBirth
            }, cancellationToken);

            var userDetailsVm = _mapper.Map<UserDetailsVm>(user);
            UserHelper.AssignClaimsToUser(userDetailsVm, claims.ToList());

            return (null, userDetailsVm);
        }
    }
}