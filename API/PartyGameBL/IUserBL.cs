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
        Task<Blackjack>GetBlackJackGameStatsByUserIdAsync(int UserId);
        Task<User>AddUserAsync(User p_user);
        Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId);
        Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<User> GetUserFromUserIdAsync(int UserId);
    }
}
