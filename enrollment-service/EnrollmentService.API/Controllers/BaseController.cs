using System.Collections.Generic;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace EnrollmentService.API.Controllers
{
    public class BaseController : ControllerBase
    {
        public BadRequestObjectResult BadRequest(List<ValidationFailure> errors)
        {
            var errorMessages = new List<string>();
            errors.ForEach(error => errorMessages.Add(error.ErrorMessage));
            return BadRequest(errorMessages);
        }
    }
}