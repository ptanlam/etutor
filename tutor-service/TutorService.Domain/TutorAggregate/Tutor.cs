using System;
using System.Collections.Generic;
using System.Linq;
using TutorService.Domain.Common;
using TutorService.Domain.ValueObjects;

namespace TutorService.Domain.TutorAggregate
{
    public class Tutor : AuditableEntity
    {
        public Tutor(string userId, string fullName, string description)
        {
            UserId = userId;
            Description = description;
            FullName = fullName;
            IsActive = false;
        }

        public Tutor(string userId, string fullName, string description, IEnumerable<Certificate> certificates,
            IEnumerable<Degree> degrees) : this(userId, fullName, description)
        {
            _certificates = certificates.ToList();
            _degrees = degrees.ToList();
        }

        public string UserId { get; }
        public string FullName { get; private set; }
        public string Description { get; private set; }
        public bool IsActive { get; private set; }

        private readonly List<Certificate> _certificates = new();
        public IEnumerable<Certificate> Certificates => _certificates.AsReadOnly();

        private readonly List<Degree> _degrees = new();
        public IEnumerable<Degree> Degrees => _degrees.AsReadOnly();

        private readonly List<Rental> _rentals = new();
        public IEnumerable<Rental> Rentals => _rentals.AsReadOnly();

        public void AddCertificates(IEnumerable<Certificate> certificates)
        {
            certificates?.ToList().ForEach(AddCertificate);
        }

        public void AddDegrees(IEnumerable<Degree> degrees)
        {
            degrees?.ToList().ForEach(AddDegree);
        }

        public void AddCertificate(Certificate certificate)
        {
            if (_certificates.Contains(certificate)) return;
            _certificates.Add(certificate);
        }

        public void AddDegree(Degree degree)
        {
            if (_degrees.Contains(degree)) return;
            _degrees.Add(degree);
        }

        public void AddRental(Rental rental)
        {
            _rentals.ForEach(r =>
            {
                if (!r.IsActive) return;
                r.Deactivate();
            });

            _rentals.Add(rental);
        }

        public void UpdateFullname(string fullname)
        {
            FullName = fullname;
        }

        public void UpdateDescription(string description)
        {
            if (ValidateUpdatedStringField(Description, description)) return;
            Description = description;
        }

        public void Deactivate()
        {
            if (!IsActive) return;
            IsActive = false;
        }

        public void Activate()
        {
            if (IsActive) return;
            IsActive = true;
        }

        public bool Unregister()
        {
            if (IsActive) return false;
            DeletedAt = DateTime.UtcNow;
            return true;
        }

        private static bool ValidateUpdatedStringField(string current, string updated)
        {
            return string.IsNullOrEmpty(updated) || current == updated;
        }
    }
}