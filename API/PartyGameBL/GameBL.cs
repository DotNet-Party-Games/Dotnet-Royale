using System;
using PartyGameModels;
using System.Collections.Generic;
using PartyGameDL;
using System.Threading.Tasks;

namespace PartyGameBL
{
    public class GameBL:IGameBL
    {
        private readonly IGameRepository _repo;
        
        public GameBL(IGameRepository p_repo)
        {
            _repo=p_repo;
        }

        public async Task<List<Games>> GetAllGamesAsync()
        {
            return await _repo.GetAllGamesAsync();
        }
        public async Task<List<ScoreHistory>> GetScoreHistoryByGameIdAsync(int GameId)
        {
            return await _repo.GetScoreHistoryByGameIdAsync(GameId);
        }
        public async Task<List<ScoreHistory>> Top10ScoresByGameIdAsync(int GameId)
        {
            return await _repo.Top10ScoresByGameIdAsync(GameId);
        }
    }
}
