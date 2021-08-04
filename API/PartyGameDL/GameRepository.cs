using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PartyGameModels;

namespace PartyGameDL
{
    public class GameRepository : IGameRepository
    {
        private readonly PartyGamesDBContext _context;
        public GameRepository(PartyGamesDBContext p_context)
        {
            _context = p_context;
        }
        public List<Games> GetAllGames()
        {
            return _context.Games.Select(gam =>gam).ToList();
        }
        //returns list of score histories for a given game
        public List<ScoreHistory> GetScoreHistoryByGameId(int GameId)
        {
            return (List<ScoreHistory>)(from q in _context.ScoreHistories
                    where (q.GameId == GameId)
                    select q).ToList();
    //         can make LINQ for brevity
    //         list of all score histories
    //         List<ScoreHistory> AllScoreHistory = _context.ScoreHistories.Select(score => score).ToList();
    //         list of score histories that will be populated per GameId
    //         List<ScoreHistory> GameScoreHistory = new List<ScoreHistory>();
    //         foreach (ScoreHistory score in AllScoreHistory)
    //         {
    //             If the GameId is found in the ScoreHistories table, add that ScoreHistory to our GameHistory list
    //            if (score.GameId == GameId)
    //            {
    //                GameScoreHistory.Add(score);
    //            }
    //         }
    //         if a score history was added to the cart return that list of relevant scores, else return null
    //        if (GameScoreHistory.Count > 0)
    //        {
    //            return GameScoreHistory;
    //        }
    //        else
    //        {
    //            //can replace with some other meaningful return value
    //            return null;
    //        }
        }
        //returns list of top 10 scores via LINQ
        public List<ScoreHistory> Top10ScoresByGameId(int GameId)
        {
            return (List<ScoreHistory>)(from q in _context.ScoreHistories
                    where (q.GameId == GameId)
                    orderby q.Score descending
                    select q).Take(10);
        }
    }
}