using System;
using TutorService.Domain.Common;

namespace TutorService.Domain.TutorAggregate
{
    public class Certificate : BaseEntity<int>
    {
        public Certificate(string name, string placeOfIssue, DateTime dateOfIssue, DateTime expiresIn)
        {
            Name = name;
            PlaceOfIssue = placeOfIssue;
            DateOfIssue = dateOfIssue;
            ExpiresIn = expiresIn;
        }

        public string Name { get; private set; }
        public string PlaceOfIssue { get; private set; }
        public DateTime DateOfIssue { get; private set; }
        public DateTime ExpiresIn { get; private set; }

        public void UpdateName(string name)
        {
            if (string.IsNullOrEmpty(name)) return;
            Name = name;
        }

        public void UpdatePlaceOfIssue(string placeOfIssue)
        {
            if (string.IsNullOrEmpty(placeOfIssue)) return;
            PlaceOfIssue = placeOfIssue;
        }

        public void UpdateDateOfIssue(DateTime dateOfIssue)
        {
            if (dateOfIssue > ExpiresIn) return;
            DateOfIssue = dateOfIssue;
        }

        public void UpdateExpiresIn(DateTime expiresIn)
        {
            if (expiresIn < DateOfIssue) return;
            ExpiresIn = expiresIn;
        }
    }
}