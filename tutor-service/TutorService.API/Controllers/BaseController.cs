using System.Collections.Generic;
using System.Text.Json;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using TutorService.Application.Shared.Responses;

namespace TutorService.API.Controllers
{
    public class BaseController : ControllerBase
    {
        public OkObjectResult Ok<T>(PagedList<T> list)
        {
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
            {
                list.TotalCount,
                list.CurrentPage,
                list.PageSize,
                list.TotalPage
            }, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));

            Response.Headers.Add("Access-Control-Expose-Headers", "X-Pagination");

            return base.Ok(list);
        }

        public BadRequestObjectResult BadRequest(List<ValidationFailure> errors)
        {
            var errorMessages = new List<string>();
            errors.ForEach(error => errorMessages.Add(error.ErrorMessage));
            return base.BadRequest(errorMessages);
        }
    }
}