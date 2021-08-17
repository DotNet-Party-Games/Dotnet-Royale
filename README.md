# Dotnet Royale
<!-- [Dotnet.Party.Games.2.docx](https://github.com/210628-UTA-NET/P2-Dotnet-Party-Games/files/6903590/Dotnet.Party.Games.2.docx) -->
https://p2partygames.azurewebsites.net/
## **Overview:**
**	Dotnet Party Games is a multiplayer mini-game roulette- a web-based application that will allow users to compete with each other in a series of simple browser games. You can make an account and queue into live matchmaking allowing users to actively compete with each other through a variety of different web games. Here, game stats can be tracked and provided within a user’s profile and a global leaderboard can be established. After a game session, users will have the option to rematch or requeue into matchmaking, where the process will be repeated. Relevant game statistics will be recorded and available for access within a user profile (wins/losses/personal best(PB)/performance).
## **Tables:**
1. User table - User Credentials
1. Games table - List of Games
1. Game-User Stat Tables (n)- Users Accumulated Game Stats
1. Leaderboard table - Global Ranking of User Score Per Game![](Aspose.Words.fa931c7b-81a0-46f8-9bc1-4928c10d63da.001.png)
<img src="https://raw.githubusercontent.com/210628-UTA-NET/P2-Dotnet-Party-Games/main/image.jpg"/>

##

## **User Stories (MVPs):**
1. As a user, I should be able to sign up for an account.
1. As a user, I should be able to sign into an account.
1. As a user, I should be able to view the global leaderboard.
1. As a user, I should be able to play a functioning mini-game.
1. As a user, I should be able to play Blackjack against the dealer.
   1. … be able to see dealer and player cards after round-end.
   1. ... be able to see match results.
   1. … be able to request a rematch.
1. As a user, I should be able to play Snake against a leaderboard.
   1. … be able to control a Snake and collect dots to grow in size.
   1. … be able to see end game result.
   1. ... be able to see game stat history.
1. As a user, I should be able to play a game of Tic-Tac-Toe against the computer.
   1. ... be able to see end game result.
1. As a user, I should be able to view my game performance history within user profile.
1. As a user, I should be able to access a live chat feature.
## **Scope Goals (Post-MVP):**
1. Increase number of games (n>5).
   1. Tetris
   1. \*Atari Pong
   1. \*Tron Bike (multiplayer snake variation)
   1. Texas-Hold em (Poker)
1. Snake Scope Goal
   1. Both players able to operate snakes within the same window
   1. User able to choose texture of snake based off of achievements
   1. Multiple difficulty levels
1. Blackjack Scope Goals
   1. User able to choose texture of cards based off of achievements
   1. Be able to house up to 7 players in a single lobby
1. Progression-based texture unlocks
1. Add spectator mode
1. Add Teams and Team Leaderboards
1. Party Mode- Best score amongst party from “n” number of games
1. Discussion forum for each game
1. Add game sound effects
1. Spotify Integration

## **Tech Stack:**

- Front End
  - Angular 11
  - Bootstrap
- Back End
  - .NET C#
  - SqlServer / Entity Framework
  - RestAPI
  - Moq/XUnit
  - Serilog
  - socket.io
- DevOps
  - Sonarcoud
  - Github Actions
  - Azure App Service
  - Heroku

