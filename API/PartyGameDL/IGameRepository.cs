using System;
using System.Collections.Generic;
using PartyGameModels;
using System.Threading.Tasks;
namespace PartyGameDL
{
    public interface IGameRepository
    {
         Task<List<Games>> GetAllGamesAsync();

        Task<List<ScoreHistory>> GetScoreHistoryByGameIdAsync(int GameId);
        Task<List<ScoreHistory>> Top10ScoresByGameIdAsync(int GameId);
        Task<List<Blackjack>> Top10BlackJackStats();
        Task<List<TicTacToe>> Top10TicTacToeStats();
        Task<List<LightBike>> Top10LightBikeStats();
    }
}
