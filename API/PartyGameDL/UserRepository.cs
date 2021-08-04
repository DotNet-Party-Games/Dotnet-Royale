using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        public User AddUser(User p_user)
        {
            //adds a complete user object to the database
            _context.Users.Add(p_user);
            _context.SaveChanges();
            return p_user;
        }
        //gets all users and returns it
        public List<User> GetAllUsers()
        {
            return _context.Users.Select(Use => Use).ToList();        
        }
        public Blackjack GetBlackJackGameStatsByUserId(int UserId)
        {
            return _context.Blackjacks.FirstOrDefault(user=>user.Id == UserId);
        }
        //gets a completed list of all the games that the user participated in 
        public List<ScoreHistory> GetScoreHistoryByUserId(int UserId)
        {
            return (List<ScoreHistory>)(from q in _context.ScoreHistories
                    where (q.UserId == UserId)
                    select q).ToList();

        }

        public Snake GetSnakeGameStatsByUserId(int UserId)
        {
            return _context.Snakes.FirstOrDefault(user=>user.Id == UserId);
        }

    }
}