using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PartyGameModels;
using PartyGameDL;
using Microsoft.AspNetCore.Mvc;
using PartyGameBL;

namespace PartyGameWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _userBL;

        public UserController(IUserBL p_userBL)
        {
            _userBL = p_userBL;
        }

        
        [HttpGet("getScoreHistoryByUserName/{p_userName}")]
        public async Task<IActionResult> GetScoreHistoryByUserName(string p_userName)
        {
            return Ok(await _userBL.GetScoreHistoryByUserNameAsync(p_userName));
        }
        // GET: User/GetSnakeGameStatsByUserName/{p_userName}
        [HttpGet("getSnakeGameStatsByUserName/{p_userName}")]
        public async Task<IActionResult> GetSnakeGameStatsByUserName(string p_userName)
        {
            return Ok(await _userBL.GetSnakeGameStatsByUserNameAsync(p_userName));
        }

        [HttpGet("getBlackJackGameStatsByUserName/{p_userName}")]
        public async Task<IActionResult> GetBlackJackGameStatsByUserName(string p_userName)
        {
            return Ok(await _userBL.GetBlackJackGameStatsByUserNameAsync(p_userName));
        }

        [HttpGet("getTicTacToeGameStatsByUserName/{p_userName}")]
        public async Task<IActionResult> GetTicTacToeGameStatsByUserName(string p_userName)
        {
            return Ok(await _userBL.GetTicTacToeGameStatsByUserNameAsync(p_userName));
        }

        [HttpGet("getLightBikeGameStatsByUserName/{p_userName}")]
        public async Task<IActionResult> GetLightBikeGameStatsByUserName(string p_userName)
        {
            return Ok(await _userBL.GetLightBikeGameStatsByUserNameAsync(p_userName));
        }

        [HttpPost("addScore")]
        public async Task<IActionResult> AddScoreHistory([FromBody] ScoreHistory p_scoreHistory)
        {

            return Created("api/User/addScore", await _userBL.AddScoreHistory(p_scoreHistory));
        }

        [HttpPost("updateSnakeStats")]
        public async Task<IActionResult> UpdateSnakeStats([FromBody] ScoreHistory p_scoreHistory)
        {
            return Created("api/User/updateSnakeStats",await _userBL.UpdateSnakeGameStatsByScoreHistory(p_scoreHistory));
        }

        [HttpPost("updateTicTacToeStats")]
        public async Task<IActionResult> UpdateTicTacToeStats([FromBody] ScoreHistory p_scoreHistory)
        {
            return Created("api/User/updateTicTacToeStats", await _userBL.UpdateTicTacToeGameStatsByScoreHistory(p_scoreHistory));
        }

        [HttpPost("updateLightBikeStats")]
        public async Task<IActionResult> UpdateLightBikeStats([FromBody] ScoreHistory p_scoreHistory)
        {
            return Created("api/User/updateLightBikeStats", await _userBL.UpdateLightBikeGameStatsByScoreHistory(p_scoreHistory));
        }

        [HttpPost("updateBlackJackStats")]
        public async Task<IActionResult> UpdateBlackJackStats([FromBody] ScoreHistory p_scoreHistory)
        {
            return Created("api/User/updateBlackJackStats", await _userBL.UpdateBlackJackGameStatsByScoreHistory(p_scoreHistory));
        }

    }
}