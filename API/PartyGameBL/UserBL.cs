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

        public async Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId)
        {
            return await _repo.GetSnakeGameStatsByUserIdAsync(UserId);
        }

        public async Task<Blackjack>GetBlackJackGameStatsByUserIdAsync(int UserId)
        {
            return await _repo.GetBlackJackGameStatsByUserIdAsync(UserId);
        }

        public async Task<TicTacToe> GetTicTacToeGameStatsByUserIdAsync(int UserId)
        {
            return await _repo.GetTicTacToeGameStatsByUserIdAsync(UserId);
        }

        public async Task<List<ScoreHistory>> GetScoreHistoryByUserIdAsync(int UserId)
        {
            return await _repo.GetScoreHistoryByUserIdAsync(UserId);
        }

        public async Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName, string Password)
        {
            return await _repo.GetUserIdFromUserNameAndPasswordAsync(UserName, Password);
        }

        public async Task<int> GetUserIdFromUserNameAsync(string UserName)
        {
            return await _repo.GetUserIdFromUserNameAsync(UserName);
        }


        public async Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password)
        {
            return await _repo.GetUserFromUserNameAndPasswordAsync(UserName, Password);
        }
        
        public async Task<User> GetUserFromUserIdAsync(int UserId)
        {
            return await _repo.GetUserFromUserIdAsync(UserId);
        }

        public async Task<ScoreHistory> AddScoreHistory(ScoreHistory p_ScoreHistory)
        {
            return await _repo.AddScoreHistory(p_ScoreHistory);
        }
        public async Task<ScoreHistory> AddScoreHistory(int UserId, int gameId, float score)
        {
            return await _repo.AddScoreHistory(UserId, gameId, score);
        }

        public async Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            return await _repo.UpdateSnakeGameStatsByScoreHistory(p_scoreHistory);
        }

        public async Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            return await _repo.UpdateTicTacToeGameStatsByScoreHistory(p_scoreHistory);
        }
    }
}
