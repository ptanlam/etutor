using System.Collections.Generic;
using System.Text.Json;
using CourseService.Application.Shared.Responses;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace CourseService.API.Controllers
{
    public class BaseController : ControllerBase
    {
        public BadRequestObjectResult BadRequest(List<ValidationFailure> errors)
        {
            var errorMessages = new List<string>();
            errors.ForEach(error => errorMessages.Add(error.ErrorMessage));
            return BadRequest(errorMessages);
        }

        public OkObjectResult Ok<T>(PagedList<T> items)
        {
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
            {
                items.TotalCount,
                items.CurrentPage,
                items.PageSize,
                items.TotalPage
            }, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));

            return base.Ok(items);
        }
    }
}