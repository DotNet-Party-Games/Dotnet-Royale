using Microsoft.AspNetCore.Mvc;
using PartyGameBL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyGameWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : Controller
    {

        private readonly IGameBL _gameBL;

        public GameController(IGameBL p_gameBL)
        {
            _gameBL = p_gameBL;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            return Ok(await _gameBL.GetAllGamesAsync());
        }

        [HttpGet("getScoreHistoryByGameId/{p_gameId}")]
        public async Task<IActionResult> GetScoreHistoryByGameId(int p_gameId)
        {
            return Ok(await _gameBL.GetScoreHistoryByGameIdAsync(p_gameId));
        }

        [HttpGet("getTop10ScoresByGameId/{p_gameId}")]
        public async Task<IActionResult> GetTop10ScoresByGameId (int p_gameId)
        {
            return Ok(await _gameBL.Top10ScoresByGameIdAsync(p_gameId));
        }
    }
}
