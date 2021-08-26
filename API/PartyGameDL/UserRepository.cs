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
            return await _context.Snakes.FirstOrDefaultAsync(snake =>snake.UserId == UserId);
        }

        public async Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var snakeData = await GetSnakeGameStatsByUserIdAsync(p_scoreHistory.UserId);
            var scoreHistories =  _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            double highScore = 0;
            foreach(ScoreHistory score in scoreHistories)
            {
                if(score.UserId == p_scoreHistory.UserId && score.GamesId==p_scoreHistory.GamesId)
                {
                    if(highScore<score.Score)
                    {
                        highScore = score.Score;
                    }
                    totalScore = score.Score;
                    count++;
                }
            }
            double avgScore = totalScore / count;
            if (snakeData != null)
            {
                Console.WriteLine(snakeData);
                _context.Snakes.Remove(snakeData);
                _context.SaveChanges();
                Snake newSnakeData = new Snake()
                {
                    UserId = p_scoreHistory.UserId,
                    GamesId = p_scoreHistory.GamesId,
                    AvgScore = avgScore,
                    HighScore = highScore
                };
                _context.Snakes.Add(newSnakeData);
                _context.SaveChanges();
            }
            else
            {
                await _context.Snakes.AddAsync(new Snake()
                {
                    UserId = p_scoreHistory.UserId,
                    GamesId = p_scoreHistory.GamesId,
                    AvgScore = avgScore,
                    HighScore = highScore
                });
                _context.SaveChanges();
            }

            return snakeData;
        }

        public async Task<int> GetUserIdFromUserNameAndPasswordAsync(string UserName,string Password)
        {
            User userInput =  await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName && 
                                                                        user.Password == Password);
            return userInput.Id;
        }

        public async Task<int> GetUserIdFromUserNameAsync(string UserName)
        {
            User userInput = await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName);
            return userInput.Id;
        }

        public async Task<User> GetUserFromUserNameAndPasswordAsync(string UserName, string Password)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName &&
                                                                       user.Password == Password);
            
        }
        public async Task<User> GetUserFromUserIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);

        }

        public async Task<ScoreHistory> AddScoreHistory(ScoreHistory p_scoreHistory)
        {
            await _context.ScoreHistories.AddAsync(p_scoreHistory);
            await _context.SaveChangesAsync();
            return p_scoreHistory;
        }

        //In case we cant pass scorehistory object can possibly do this instead.
        public async Task<ScoreHistory> AddScoreHistory(int UserId, int GameId, float score)
        {
            ScoreHistory scoreHistory = new ScoreHistory();
            scoreHistory.UserId = UserId;
            scoreHistory.GamesId = GameId;
            scoreHistory.Score = score;
            await _context.ScoreHistories.AddAsync(scoreHistory);
            await _context.SaveChangesAsync();
            return scoreHistory;
        }

        public async Task<TicTacToe> GetTicTacToeGameStatsByUserIdAsync(int UserId)
        {
            return await _context.TicTacToes.FirstOrDefaultAsync(t => t.UserId == UserId);
        }

        public async Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var ticTacToeData = await GetTicTacToeGameStatsByUserIdAsync(p_scoreHistory.UserId);
            var scoreHistories = _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            foreach (ScoreHistory score in scoreHistories)
            {
                if (score.UserId == p_scoreHistory.UserId && score.GamesId == p_scoreHistory.GamesId)
                {

                    totalScore = score.Score;
                    count++;
                }
            }
            double avgScore = totalScore / count;
            if (ticTacToeData != null)
            {
                Console.WriteLine(ticTacToeData);
                _context.TicTacToes.Remove(ticTacToeData);
                _context.SaveChanges();
                TicTacToe newTictacToeData = new TicTacToe()
                {
                    UserId = p_scoreHistory.UserId,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                };
                _context.TicTacToes.Add(newTictacToeData);
                _context.SaveChanges();
            }
            else
            {
                await _context.TicTacToes.AddAsync(new TicTacToe()
                {
                    UserId = p_scoreHistory.UserId,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                });
                _context.SaveChanges();
            }

            return ticTacToeData;
        }

    }
}