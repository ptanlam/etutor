﻿// <auto-generated />
using System;
using EnrollmentService.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EnrollmentService.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220619024236_AddedMoney")]
    partial class AddedMoney
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.14")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EnrollmentService.Domain.EnrollmentAggregate.Enrollment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CourseId")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("StudentId")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Enrollments");
                });

            modelBuilder.Entity("EnrollmentService.Domain.EnrollmentAggregate.EnrollmentTransaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid?>("NewEnrollmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Notes")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<Guid?>("OldEnrollmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PerformerId")
                        .HasMaxLength(50)
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Type")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.HasIndex("NewEnrollmentId");

                    b.HasIndex("OldEnrollmentId");

                    b.ToTable("EnrollmentTransactions");
                });

            modelBuilder.Entity("EnrollmentService.Domain.PerformerAggregate.Performer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .HasMaxLength(320)
                        .HasColumnType("nvarchar(320)");

                    b.Property<string>("Name")
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Performers");
                });

            modelBuilder.Entity("EnrollmentService.Domain.EnrollmentAggregate.Enrollment", b =>
                {
                    b.OwnsOne("EnrollmentService.Domain.ValueObjects.Money", "Tuition", b1 =>
                        {
                            b1.Property<Guid>("EnrollmentId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(17,2)")
                                .HasColumnName("TuitionAmount");

                            b1.Property<string>("Unit")
                                .HasMaxLength(3)
                                .HasColumnType("nvarchar(3)")
                                .HasColumnName("TuitionName");

                            b1.HasKey("EnrollmentId");

                            b1.ToTable("Enrollments");

                            b1.WithOwner()
                                .HasForeignKey("EnrollmentId");
                        });

                    b.Navigation("Tuition");
                });

            modelBuilder.Entity("EnrollmentService.Domain.EnrollmentAggregate.EnrollmentTransaction", b =>
                {
                    b.HasOne("EnrollmentService.Domain.EnrollmentAggregate.Enrollment", "NewEnrollment")
                        .WithMany()
                        .HasForeignKey("NewEnrollmentId");

                    b.HasOne("EnrollmentService.Domain.EnrollmentAggregate.Enrollment", "OldEnrollment")
                        .WithMany()
                        .HasForeignKey("OldEnrollmentId");

                    b.Navigation("NewEnrollment");

                    b.Navigation("OldEnrollment");
                });
#pragma warning restore 612, 618
        }
    }
}