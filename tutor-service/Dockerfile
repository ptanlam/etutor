FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 3000
EXPOSE 4000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TutorService.API/TutorService.API.csproj", "TutorService.API/"]
COPY ["TutorService.Application/TutorService.Application.csproj", "TutorService.Application/"]
COPY ["TutorService.Domain/TutorService.Domain.csproj", "TutorService.Domain/"]
COPY ["TutorService.Persistence/TutorService.Persistence.csproj", "TutorService.Persistence/"]
COPY ["TutorService.Infrastructure/TutorService.Infrastructure.csproj", "TutorService.Infrastructure/"]
RUN dotnet restore "TutorService.API/TutorService.API.csproj"
COPY . .
WORKDIR "/src/TutorService.API"
RUN dotnet build "TutorService.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TutorService.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TutorService.API.dll"]
