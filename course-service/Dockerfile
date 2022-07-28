FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
RUN apt update -y && apt install curl -y
EXPOSE 3000
EXPOSE 4000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["CourseService.API/CourseService.API.csproj", "CourseService.API/"]
COPY ["CourseService.Application/CourseService.Application.csproj", "CourseService.Application/"]
COPY ["CourseService.Domain/CourseService.Domain.csproj", "CourseService.Domain/"]
COPY ["CourseService.Persistence/CourseService.Persistence.csproj", "CourseService.Persistence/"]
RUN dotnet restore "CourseService.API/CourseService.API.csproj"
COPY . .
WORKDIR "/src/CourseService.API"
RUN dotnet build "CourseService.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CourseService.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CourseService.API.dll"]
