using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PartyGameModels;
namespace PartyGameDL
{
    public interface IUserRepository
    {
        Task<List<ScoreHistory>> GetScoreHistoryByUserIdAsync(int UserId);
        Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId);
        Task<Blackjack> GetBlackJackGameStatsByUserIdAsync(int UserId);
        Task<TicTacToe> GetTicTacToeGameStatsByUserIdAsync(int UserId);
        Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName,string Password);
        Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<User> GetUserFromUserIdAsync(int userId);
        Task<List<User>> GetAllUsersAsync();
        Task<User> AddUserAsync(User p_user);
        Task<ScoreHistory> AddScoreHistory(ScoreHistory p_scoreHistory);
        Task<ScoreHistory> AddScoreHistory(int UserId, int gameId, float score);
        Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
        Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
    }
}