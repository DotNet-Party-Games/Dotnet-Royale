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
        private PartyGamesDBContext _context;
        public UserRepository(PartyGamesDBContext p_context)
        {
            _context = p_context;
        }

        public User AddUser(User p_user)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public List<Blackjack> GetBlackJackGameStatsByUserId(int UserId)
        {
            throw new NotImplementedException();
        }

        public List<ScoreHistory> GetScoreHistoryByUserId(int UserId)
        {
            throw new NotImplementedException();
        }

        public List<Snake> GetSnakeGameStatsByUserId(int UserId)
        {
            throw new NotImplementedException();
        }
    }
}