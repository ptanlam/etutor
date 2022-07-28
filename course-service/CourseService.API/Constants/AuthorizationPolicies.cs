namespace CourseService.API.Constants
{
    public static class AuthorizationPolicies
    {
        public const string CanCreateCourses = "can-create-courses";
        public const string CanReadInactiveCourses = "can-read-inactive-courses";
        public const string CanActivateCourses = "can-activate-courses";
    }
}