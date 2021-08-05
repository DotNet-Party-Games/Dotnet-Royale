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

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userBL.GetAllUsersAsync());
        }

        [HttpGet("getScoreHistoryByUserId/{p_userId}")]
        public async Task<IActionResult> GetScoreHistoryByUserId(int p_userId)
        {
            return Ok(await _userBL.GetScoreHistoryByUserIdAsync(p_userId));
        }
        // GET: User/GetSnakeGameStatsByUserId/{p_userId}
        [HttpGet("getSnakeGameStatsByUserId/{p_userId}")]
        public async Task<IActionResult> GetSnakeGameStatsByUserId(int p_userId)
        {
            return Ok(await _userBL.GetSnakeGameStatsByUserIdAsync(p_userId));
        }

        [HttpGet("getBlackJackGameStatsByUserId/{p_userId}")]
        public async Task<IActionResult> GetBlackJackGameStatsByUserId(int p_userId)
        {
            return Ok(await _userBL.GetBlackJackGameStatsByUserIdAsync(p_userId));
        }

        [HttpGet("getUserIdFromUserName/{p_userName}")]
        public async Task<IActionResult> GetUserIdFromUserName(string p_userName)
        {
            return Ok(await _userBL.GetUserIdFromUserNameAsync(p_userName));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] User p_user)
        {
            return Created("api/User/add", await _userBL.AddUserAsync(p_user));
        }
    }
}