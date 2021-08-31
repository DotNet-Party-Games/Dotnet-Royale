using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PartyGameModels;
namespace PartyGameDL
{
    public interface IUserRepository
    {
        Task<List<ScoreHistory>> GetScoreHistoryByUserNameAsync(string UserName);
        Task<Snake> GetSnakeGameStatsByUserNameAsync(string UserName);
        Task<Blackjack> GetBlackJackGameStatsByUserNameAsync(string UserName);
        Task<TicTacToe> GetTicTacToeGameStatsByUserNameAsync(string UserName);
        Task<ScoreHistory> AddScoreHistory(ScoreHistory p_scoreHistory);
        Task<ScoreHistory> AddScoreHistory(string UserName, int gameId, float score);
        Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
        Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
    }
}