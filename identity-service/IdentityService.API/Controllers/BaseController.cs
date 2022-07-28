using System;
using System.Collections.Generic;
using System.Text.Json;
using Auth0.ManagementApi.Paging;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected BadRequestObjectResult BadRequest(List<ValidationFailure> errors)
        {
            var errorMessages = new List<string>();
            errors.ForEach(error => errorMessages.Add(error.ErrorMessage));
            return BadRequest(errorMessages);
        }
        
        public OkObjectResult Ok<T>(IPagedList<T> items)
        {
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
            {
                TotalCount = items.Paging.Total,
                CurrentPage = items.Paging.Start,
                PageSize = items.Paging.Limit,
                TotalPage = Math.Ceiling(items.Paging.Total / (double)items.Paging.Limit)
            }, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));

            Response.Headers.Add("Access-Control-Expose-Headers", "X-Pagination");

            return base.Ok(items);
        }

    }
}