FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 3000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["EnrollmentService.API/EnrollmentService.API.csproj", "EnrollmentService.API/"]
RUN dotnet restore "EnrollmentService.API/EnrollmentService.API.csproj"
COPY . .
WORKDIR "/src/EnrollmentService.API"
RUN dotnet build "EnrollmentService.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EnrollmentService.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EnrollmentService.API.dll"]
