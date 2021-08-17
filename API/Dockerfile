FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
# COPY ["PillowFight.Api/PillowFight.Api.csproj", "PillowFight.Api/"]
COPY ["PartyGameWebAPI/PartyGameWebAPI.csproj", "PartyGameWebAPI/"]
# RUN dotnet restore "PillowFight.Api/PillowFight.Api.csproj"
RUN dotnet restore "PartyGameWebAPI/PartyGameWebAPI.csproj"
COPY . .
WORKDIR "/src/PartyGameWebAPI"
RUN dotnet build "PartyGameWebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PartyGameWebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PartyGameWebAPI.dll"]


# FROM mcr.microsoft.com/dotnet/aspnet:5.0 as build
# WORKDIR /app

# COPY *.sln ./
# COPY PartyGameBL/*.csproj PartyGameBL/
# COPY PartyGameDL/*.csproj PartyGameDL/
# COPY PartyGameModels/*.csproj PartyGameModels/
# COPY PartyGameTest/*.csproj PartyGameTest/
# COPY PartyGameWebAPI/*.csproj PartyGameWebAPI/

# RUN cd PartyGameWebAPI && dotnet Restore

# COPY . ./

# RUN dotnet publish PartyGameWebAPI -c Release -o dotnetPartyGamePublish --no-restore

# FROM mcr.microsoft.com/dotnet/runtime:5.0 as runtime

# WORKDIR /app

# COPY --from=build /app/publish ./

# CMD ["dotnet","PartyGameWebAPI.dll"]

# EXPOSE 80