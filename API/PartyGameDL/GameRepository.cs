using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PartyGameModels;
using System.Threading.Tasks;
namespace PartyGameDL
{
    public class GameRepository : IGameRepository
    {
        private readonly PartyGamesDBContext _context;
        public GameRepository(PartyGamesDBContext p_context)
        {
            _context = p_context;
        }
        public async Task<List<Games>> GetAllGamesAsync()
        {
            return await _context.Games.Select(gam =>gam).ToListAsync();
        }
        //returns list of score histories for a given game
        public async Task<List<ScoreHistory>> GetScoreHistoryByGameIdAsync(int GameId)
        {
            return await _context.ScoreHistories.Where(score => score.GamesId == GameId).ToListAsync();
            
        }
        //returns list of top 10 scores via LINQ
        public async Task<List<ScoreHistory>> Top10ScoresByGameIdAsync(int GameId)
        {
            return await _context.ScoreHistories.Where(score => score.GamesId == GameId)
                .OrderByDescending(score => score.Score )
                .Take(10)
                .ToListAsync();
            /* return await (List<ScoreHistory>)(from q in _context.ScoreHistories
                     where (q.GameId == GameId)
                     orderby q.Score descending
                     select q).Take(10);*/
        }

        public async Task<List<Blackjack>> Top10BlackJackStats()
        {
            return await _context.Blackjacks.Select(score => score)
                .OrderByDescending(score => score.WinLossRatio)
                .Take(10)
                .ToListAsync();
            /* return await (List<ScoreHistory>)(from q in _context.ScoreHistories
                     where (q.GameId == GameId)
                     orderby q.Score descending
                     select q).Take(10);*/
        }

        public async Task<List<LightBike>> Top10LightBikeStats()
        {
            return await _context.LightBikes.Select(score => score)
                .OrderByDescending(score => score.WinLossRatio)
                .Take(10)
                .ToListAsync();
            /* return await (List<ScoreHistory>)(from q in _context.ScoreHistories
                     where (q.GameId == GameId)
                     orderby q.Score descending
                     select q).Take(10);*/
        }

        public async Task<List<TicTacToe>> Top10TicTacToeStats()
        {
            return await _context.TicTacToes.Select(score => score)
                .OrderByDescending(score => score.WinLossRatio)
                .Take(10)
                .ToListAsync();
            /* return await (List<ScoreHistory>)(from q in _context.ScoreHistories
                     where (q.GameId == GameId)
                     orderby q.Score descending
                     select q).Take(10);*/
        }
    }
}