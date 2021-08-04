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