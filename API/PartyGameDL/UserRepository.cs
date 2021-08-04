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
        //Finds a Users Blackjack Stats (singular score ratio) from the blackjacks table
        //We may need to change this to List<Blackjack> (how it originally was). I am not sure if the Blackjacks table is a 1:1 or a 1:many relationship with users (Users:BlackJack)
        public Blackjack GetBlackJackGameStatsByUserId(int UserId)
        {
            //list of all blackjack score histories (grouped by user?)
            List<Blackjack> BlackJackScoreHistories = _context.Blackjacks.Select(BJ => BJ).ToList();
            //loop thorugh the score histories and find the UserID
            foreach (Blackjack user in BlackJackScoreHistories)
            {
                //If the UserID is found, return that Blackjack Entry for that User (houses score history (WinLossRatio))
                if (UserId == user.UserId)
                {
                    return user;
                }
            }
            //if the userId doesnt match, return null (no data present) 
            //maybe return some other meaningful message?
            return null;
        }
        //gets a completed list of all the games that the user participated in 
        public List<ScoreHistory> GetScoreHistoryByUserId(int UserId)
        {
            //list of all rows in "ScoreHistories"
            List<ScoreHistory> AllGamesScores = _context.ScoreHistories.Select(Score => Score).ToList();
            //list of UserScores by UserId in param (will be returned)
            List<ScoreHistory> UserScoreHistory = new List<ScoreHistory>();
            foreach (ScoreHistory score in AllGamesScores)
            {
                //If user ID is found in database, add row to "UserScoreHistory"
                if (score.UserId == UserId)
                {
                    UserScoreHistory.Add(score);
                }
            }
            //If user had atleast one score, return, else return null
            if (UserScoreHistory.Count > 0)
            {
                return UserScoreHistory;
            }
            else
            {
                //can return something else that is meaningful
                return null;
            }
        }

        public Snake GetSnakeGameStatsByUserId(int UserId)
        {
             //list of all snake score histories (grouped by user?)
            List<Snake> SnakeScoreHistories = _context.Snakes.Select(BJ => BJ).ToList();
            //loop thorugh the score histories and find the UserID
            foreach (Snake user in SnakeScoreHistories)
            {
                //If the UserID is found, return that Blackjack Entry for that User (houses score history (WinLossRatio))
                if (UserId == user.UserId)
                {
                    return user;
                }
            }
            //if the userId doesnt match, return null (no data present) 
            //maybe return some other meaningful message?
            return null; 
        }
    }
}