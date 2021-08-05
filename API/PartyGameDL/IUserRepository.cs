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
        Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName,string Password);
        Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password);
        Task<List<User>>GetAllUsersAsync();
        Task<User> AddUserAsync(User p_user);
    }
}