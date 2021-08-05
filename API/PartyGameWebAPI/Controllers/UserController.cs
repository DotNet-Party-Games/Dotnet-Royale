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

        [HttpGet("getUserIdFromUserNameAndPassword/{p_userName}/{p_password}")]
        public async Task<IActionResult> GetUserIdFromUserNameAndPassword(string p_userName, string p_password)
        {
            return Ok(await _userBL.GetUserIdFromUserNameAndPasswordAsync(p_userName, p_password));
        }

        [HttpGet("getUserFromUserId/{p_userId}")]
        public async Task<IActionResult> GetUserFromUserId(int p_userId)
        {
            return Ok(await _userBL.GetUserFromUserIdAsync(p_userId));
        }
        [HttpPost("getUserFromUserNameAndPassword")]
        public async Task<IActionResult> VerifyUserNameAndPassword([FromBody] User p_user)
        {
            return Accepted(await _userBL.GetUserFromUserNameAndPasswordAsync(p_user.UserName, p_user.Password));
        }

        [HttpGet("getUserFromUserNameAndPassword")]
        public async Task<IActionResult> GetUserFromUserNameAndPassword([FromBody] User p_user)
        {
            return Ok(await _userBL.GetUserIdFromUserNameAndPasswordAsync(p_user.UserName, p_user.Password));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] User p_user)
        {
            return Created("api/User/add", await _userBL.AddUserAsync(p_user));
        }
    }
}