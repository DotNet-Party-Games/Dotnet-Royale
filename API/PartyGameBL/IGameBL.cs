using System;
using PartyGameModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PartyGameBL
{
    public interface IGameBL 
    {
        
        Task<List<Games>> GetAllGamesAsync();
        Task<List<ScoreHistory>> GetScoreHistoryByGameIdAsync(int GameId);
        Task<List<ScoreHistory>> Top10ScoresByGameIdAsync(int GameId);
        Task<List<TicTacToe>> Top10TicTacToeStats();
        Task<List<Blackjack>> Top10BlackJackStats();
        Task<List<LightBike>> Top10LightBikeStats();

    }
}
