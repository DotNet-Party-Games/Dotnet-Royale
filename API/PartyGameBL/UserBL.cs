using System;
using PartyGameModels;
using System.Collections.Generic;
using PartyGameDL;
using System.Threading.Tasks;
namespace PartyGameBL
{
    public class UserBL:IUserBL
    {
        private readonly IUserRepository _repo;
        
        public UserBL(IUserRepository p_repo)
        {
            _repo=p_repo;
        }

        public async Task<User> AddUserAsync(User p_user)
        {
            return await _repo.AddUserAsync(p_user);
        }

        public async Task<List<User>>GetAllUsersAsync()
        {
            return await _repo.GetAllUsersAsync();
        }

        public async Task<Blackjack>GetBlackJackGameStatsByUserIdAsync(int UserId)
        {
            return await _repo.GetBlackJackGameStatsByUserIdAsync(UserId);
        }

        public async Task<List<ScoreHistory>> GetScoreHistoryByUserIdAsync(int UserId)
        {
            return await _repo.GetScoreHistoryByUserIdAsync(UserId);
        }

        public async Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId)
        {
            return await _repo.GetSnakeGameStatsByUserIdAsync(UserId);
        }

        public async Task<int> GetUserIdFromUserNameAsync(string UserName)
        {
            return await _repo.GetUserIdFromUserNameAsync(UserName);
        }
    }
}
