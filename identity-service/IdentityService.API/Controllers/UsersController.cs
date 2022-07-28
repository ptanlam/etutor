using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Features.UserClaims.Queries.CheckPhoneNumberIsExisting;
using IdentityService.Application.Features.Users.Commands.CreateNewUser;
using IdentityService.Application.Features.Users.Commands.UpdateUser;
using IdentityService.Application.Features.Users.Queries.CheckEmailIsExisting;
using IdentityService.Application.Features.Users.Queries.GetUserDetails;
using IdentityService.Application.Features.Users.Queries.GetUserPagedList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : BaseController
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetPagedList([FromQuery] GetUserPagedList getUserPagedList)
        {
            var (errors, userList) = await _mediator.Send(getUserPagedList);
            if (errors != null) return BadRequest(errors);

            return Ok(userList);
        }

        [Authorize]
        [HttpGet("{id}", Name = "GetUserDetails")]
        public async Task<IActionResult> GetDetails([FromRoute] GetUserDetails getUserDetails)
        {
            var user = await _mediator.Send(getUserDetails);
            if (user == null) return NotFound($"User with id {getUserDetails.Id} cannot be found");
            return Ok(user);
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> CheckEmailIsExisting([FromRoute] CheckEmailIsExisting checkEmailIsExisting,
            CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(checkEmailIsExisting, cancellationToken);
            return Ok(result);
        }

        [HttpGet("phone-number/{phoneNumber}")]
        public async Task<IActionResult> CheckPhoneNumberIsExisting(
            [FromRoute] CheckPhoneNumberIsExisting checkPhoneNumberIsExisting,
            CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(checkPhoneNumberIsExisting, cancellationToken);
            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNewUser createNewUser)
        {
            var (errors, user) = await _mediator.Send(createNewUser);
            if (errors != null) return BadRequest(errors);

            return CreatedAtRoute("GetUserDetails", new {id = user.Id}, user);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateUser updateUser,
            CancellationToken cancellationToken)
        {
            updateUser.Id = id;
            var (errors, userDetailsVm) = await _mediator.Send(updateUser, cancellationToken);
            if (errors != null) return BadRequest(errors);

            return Ok(userDetailsVm);
        }
    }
}