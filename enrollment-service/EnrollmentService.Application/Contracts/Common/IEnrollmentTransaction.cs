using EnrollmentService.Domain.EnrollmentAggregate;

namespace EnrollmentService.Application.Contracts.Common
{
    public interface IEnrollmentTransaction
    {
        (EnrollmentTransaction transaction, Enrollment enrollment) Execute();
    }
}