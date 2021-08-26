using System;
using PartyGameModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PartyGameBL
{
    public interface IUserBL 
    {
        
        Task<List<User>> GetAllUsersAsync();
        Task<List<ScoreHistory>> GetScoreHistoryByUserIdAsync(int UserId);
        Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId);
        Task<Blackjack> GetBlackJackGameStatsByUserIdAsync(int UserId);
        Task<TicTacToe> GetTicTacToeGameStatsByUserIdAsync(int UserId);
        Task<User> AddUserAsync(User p_user);
        Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<int> GetUserIdFromUserNameAsync(string p_userName);
        Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<User> GetUserFromUserIdAsync(int UserId);
        Task<ScoreHistory> AddScoreHistory(ScoreHistory p_scoreHistory);
        Task<ScoreHistory> AddScoreHistory(int UserId, int gameId, float score);
        Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
        Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory);
    }
}
