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

        public async Task<Snake> GetSnakeGameStatsByUserNameAsync(string UserName)
        {
            return await _repo.GetSnakeGameStatsByUserNameAsync(UserName);
        }

        public async Task<Blackjack>GetBlackJackGameStatsByUserNameAsync(string UserName)
        {
            return await _repo.GetBlackJackGameStatsByUserNameAsync(UserName);
        }

        public async Task<TicTacToe> GetTicTacToeGameStatsByUserNameAsync(string UserName)
        {
            return await _repo.GetTicTacToeGameStatsByUserNameAsync(UserName);
        }

        public async Task<List<ScoreHistory>> GetScoreHistoryByUserNameAsync(string UserName)
        {
            return await _repo.GetScoreHistoryByUserNameAsync(UserName);
        }

        public async Task<ScoreHistory> AddScoreHistory(ScoreHistory p_ScoreHistory)
        {
            return await _repo.AddScoreHistory(p_ScoreHistory);
        }
        public async Task<ScoreHistory> AddScoreHistory(string UserName, int gameId, float score)
        {
            return await _repo.AddScoreHistory(UserName, gameId, score);
        }

        public async Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            return await _repo.UpdateSnakeGameStatsByScoreHistory(p_scoreHistory);
        }

        public async Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            return await _repo.UpdateTicTacToeGameStatsByScoreHistory(p_scoreHistory);
        }


        public async Task<LightBike> GetLightBikeGameStatsByUserNameAsync(string UserName)
        {
            return await _repo.GetLightBikeGameStatsByUserNameAsync(UserName);
        }
        public async Task<LightBike> UpdateLightBikeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            return await _repo.UpdateLightBikeGameStatsByScoreHistory(p_scoreHistory);
        }
    }
}
