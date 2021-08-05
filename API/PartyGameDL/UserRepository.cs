using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PartyGameModels;

namespace PartyGameDL
{
    public class UserRepository : IUserRepository
    {
        private readonly PartyGamesDBContext _context;
        public UserRepository(PartyGamesDBContext p_context)
        {
            _context = p_context;
        }
        //adds a user
        public async Task<User> AddUserAsync(User p_user)
        {
            //adds a complete user object to the database
            await _context.Users.AddAsync(p_user);
            await _context.SaveChangesAsync();
            return p_user;
        }
        //gets all users and returns it
        public async Task <List<User>> GetAllUsersAsync()
        {
            return await _context.Users.Select(Use => Use).ToListAsync();        
        }
        public async Task <Blackjack> GetBlackJackGameStatsByUserIdAsync(int UserId)
        {
            return await _context.Blackjacks.FirstOrDefaultAsync(blackjack=>blackjack.UserId == UserId);
        }
        //gets a completed list of all the games that the user participated in 
        public async Task< List<ScoreHistory>> GetScoreHistoryByUserIdAsync(int UserId)
        {

            return await _context.ScoreHistories.Where
                (score => score.UserId == UserId).ToListAsync();
            /*return (List<ScoreHistory>)(from q in _context.ScoreHistories
                    where (q.UserId == UserId)
                    select q).ToList();*/

        }

        public async Task<Snake> GetSnakeGameStatsByUserIdAsync(int UserId)
        {
            return await _context.Snakes.FirstOrDefaultAsync(user=>user.Id == UserId);
        }

        public async Task<int> GetUserIdFromUserNameAsync(string UserName)
        {
            User userInput =  await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName);
            return userInput.Id;
        }
    }
}