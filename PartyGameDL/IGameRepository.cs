using System;
using System.Collections.Generic;
using PartyGameModels;
namespace PartyGameDL
{
    public interface IGameRepository
    {
        List<Games> GetAllGames();

        List<ScoreHistory> GetScoreHistoryByGameId(int GameId);
        List<ScoreHistory> Top10ScoresByGameId(int GameId);
    }
}
