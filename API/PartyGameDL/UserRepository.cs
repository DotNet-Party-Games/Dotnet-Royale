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
     
        public async Task <Blackjack> GetBlackJackGameStatsByUserNameAsync(string UserName)
        {
            return await _context.Blackjacks.FirstOrDefaultAsync(blackjack=>blackjack.UserName == UserName);
        }
        //gets a completed list of all the games that the user participated in 
        public async Task< List<ScoreHistory>> GetScoreHistoryByUserNameAsync(string UserName)
        {

            return await _context.ScoreHistories.Where
                (score => score.UserName == UserName).ToListAsync();
            /*return (List<ScoreHistory>)(from q in _context.ScoreHistories
                    where (q.UserName == UserName)
                    select q).ToList();*/

        }
        

        public async Task<Snake> GetSnakeGameStatsByUserNameAsync(string UserName)
        {
            return await _context.Snakes.FirstOrDefaultAsync(snake =>snake.UserName == UserName);
        }

        public async Task<Snake> UpdateSnakeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var snakeData = await GetSnakeGameStatsByUserNameAsync(p_scoreHistory.UserName);
            var scoreHistories =  _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            double highScore = 0;
            foreach(ScoreHistory score in scoreHistories)
            {
                if(score.UserName == p_scoreHistory.UserName && score.GamesId==p_scoreHistory.GamesId)
                {
                    if(highScore<score.Score)
                    {
                        highScore = score.Score;
                    }
                    totalScore += score.Score;
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
                    UserName = p_scoreHistory.UserName,
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
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    AvgScore = avgScore,
                    HighScore = highScore
                });
                _context.SaveChanges();
            }

            return snakeData;
        }


        public async Task<ScoreHistory> AddScoreHistory(ScoreHistory p_scoreHistory)
        {
            await _context.ScoreHistories.AddAsync(p_scoreHistory);
            await _context.SaveChangesAsync();
            return p_scoreHistory;
        }

        //In case we cant pass scorehistory object can possibly do this instead.
        public async Task<ScoreHistory> AddScoreHistory(string UserName, int GameId, float score)
        {
            ScoreHistory scoreHistory = new ScoreHistory();
            scoreHistory.UserName = UserName;
            scoreHistory.GamesId = GameId;
            scoreHistory.Score = score;
            await _context.ScoreHistories.AddAsync(scoreHistory);
            await _context.SaveChangesAsync();
            return scoreHistory;
        }

        public async Task<TicTacToe> GetTicTacToeGameStatsByUserNameAsync(string UserName)
        {
            return await _context.TicTacToes.FirstOrDefaultAsync(t => t.UserName == UserName);
        }

        public async Task<TicTacToe> UpdateTicTacToeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var ticTacToeData = await GetTicTacToeGameStatsByUserNameAsync(p_scoreHistory.UserName);
            var scoreHistories = _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            foreach (ScoreHistory score in scoreHistories)
            {
                if (score.UserName == p_scoreHistory.UserName && score.GamesId == p_scoreHistory.GamesId)
                {

                    totalScore += score.Score;
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
                    UserName = p_scoreHistory.UserName,
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
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                });
                _context.SaveChanges();
            }

            return ticTacToeData;
        }



        public async Task<Blackjack> UpdateBlackJackGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var BlackJackData = await GetBlackJackGameStatsByUserNameAsync(p_scoreHistory.UserName);
            var scoreHistories = _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            foreach (ScoreHistory score in scoreHistories)
            {
                if (score.UserName == p_scoreHistory.UserName && score.GamesId == p_scoreHistory.GamesId)
                {

                    totalScore += score.Score;
                    count++;
                }
            }
            double avgScore = totalScore / count;
            if (BlackJackData != null)
            {
                Console.WriteLine(BlackJackData);
                _context.Blackjacks.Remove(BlackJackData);
                _context.SaveChanges();
                Blackjack newBlackJackData = new Blackjack()
                {
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                };
                _context.Blackjacks.Add(newBlackJackData);
                _context.SaveChanges();
            }
            else
            {
                await _context.Blackjacks.AddAsync(new Blackjack()
                {
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                });
                _context.SaveChanges();
            }

            return BlackJackData;
        }


        public async Task<LightBike> GetLightBikeGameStatsByUserNameAsync(string UserName)
        {
            return await _context.LightBikes.FirstOrDefaultAsync(t => t.UserName == UserName);
        }
        public async Task<LightBike> UpdateLightBikeGameStatsByScoreHistory(ScoreHistory p_scoreHistory)
        {
            var lightBikeData = await GetLightBikeGameStatsByUserNameAsync(p_scoreHistory.UserName);
            var scoreHistories = _context.ScoreHistories.Select(scores => scores).ToList();
            int count = 0;
            double totalScore = 0;
            foreach (ScoreHistory score in scoreHistories)
            {
                if (score.UserName == p_scoreHistory.UserName && score.GamesId == p_scoreHistory.GamesId)
                {

                    totalScore += score.Score;
                    count++;
                }
            }
            double avgScore = totalScore / count;
            if (lightBikeData != null)
            {
                Console.WriteLine(lightBikeData);
                _context.LightBikes.Remove(lightBikeData);
                _context.SaveChanges();
                LightBike newLightBikeData = new LightBike()
                {
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                };
                _context.LightBikes.Add(newLightBikeData);
                _context.SaveChanges();
            }
            else
            {
                await _context.LightBikes.AddAsync(new LightBike()
                {
                    UserName = p_scoreHistory.UserName,
                    GamesId = p_scoreHistory.GamesId,
                    WinLossRatio = Math.Round(avgScore, 2)
                });
                _context.SaveChanges();
            }

            return lightBikeData;
        }

    }
}