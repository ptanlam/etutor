namespace IdentityService.Application.Common.Requests
{
    public class GetPagedList
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}