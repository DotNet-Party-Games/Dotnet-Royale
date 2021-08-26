using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using PartyGameDL;
using PartyGameModels;
using Xunit;

namespace PartyGameTest
{
    public class RepositoryTesting
    {
        private readonly DbContextOptions<PartyGamesDBContext> _options;
        public RepositoryTesting()
        {
            //is "Filename = Test.db" necessary and where is it pointing?
            _options = new DbContextOptionsBuilder<PartyGamesDBContext>().UseSqlite("Filename = Test.db").Options;
            this.Seed();
        }

        [Fact]
        public async void GetAllUsersShouldGetAllUsers()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                List <User> allUsers = await repo .GetAllUsersAsync();
                int numOfUsers = allUsers.Count;
                Assert.Equal(2, numOfUsers);
            }
        }

        [Fact]
        public async void GetUserIdFromUserNameAndPasswordShouldGetUserId()
        { 
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                int UserId = await repo.GetUserIdFromUserNameAndPasswordAsync("TestUserName2", "TestPassword2");
                Assert.Equal(2, UserId);
            }
        }

        [Fact]
        public async void GetUserFromUserNameAndPasswordShouldGetUser()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                User User1 = await repo.GetUserFromUserNameAndPasswordAsync("TestUserName2", "TestPassword2");
                Assert.NotNull(User1);
            }
        }

        [Fact]
        public async void GetAllGamesShouldGetAllGames()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IGameRepository repo = new GameRepository(context);
                List <Games> allGames = await repo .GetAllGamesAsync();
                int numOfGames = allGames.Count;
                Assert.Equal(3, numOfGames);
            }
        }
        [Fact]
        public async void AddingUserShouldAddUser()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                User newUser = new User()
                {
                    Id = 0,
                    UserName = "Test3",
                    Password = "Pass3",
                };
                await repo.AddUserAsync(newUser);
                List<User> allUsers = await repo.GetAllUsersAsync();
                int numOfUsers = allUsers.Count;
                Assert.Equal(3, numOfUsers);
            }
        }
        [Fact]
        public async void GetScoreHistoryByGameIdShouldGetGameScoreHistory()
        {
             using (var context = new PartyGamesDBContext(_options))
            {
                IGameRepository repo = new GameRepository(context);
                List <ScoreHistory> snakeScoreHistory = await repo .GetScoreHistoryByGameIdAsync(1);
                List <ScoreHistory> blackJackScoreHistory = await repo.GetScoreHistoryByGameIdAsync(2);
                int numberOfBlackjackScores = blackJackScoreHistory.Count;
                int numberOfSnakeScores = snakeScoreHistory.Count;
                Assert.Equal(11, numberOfSnakeScores);
                Assert.Equal(0, numberOfBlackjackScores);

            }
        }
        [Fact]
        public async void GetScoreHistoryByUserIdShouldGetAUsersScoreHistory()
        {
             using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                List <ScoreHistory> UserScoreHistory = await repo.GetScoreHistoryByUserIdAsync(1);
                int numberOfUserScores = UserScoreHistory.Count;
                Assert.Equal(4, numberOfUserScores);

            }
        }
        [Fact]
        public async void GetBlackjackGameStatsByUserIdShouldGetAUsersBlackjackStats()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                var UserScoreHistory = await repo.GetBlackJackGameStatsByUserIdAsync(1);
                float UserWinLoss = UserScoreHistory.WinLossRatio;
                Assert.Equal(0.80f, UserWinLoss);
            }
        }
        [Fact]
        public async void GetSnakeGameStatsByUserIdShouldGetAUsersSnakeStats()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                Snake UserScoreHistory = await repo.GetSnakeGameStatsByUserIdAsync(1);
                double UserHighScore = UserScoreHistory.HighScore;
                double UserAvgScore = UserScoreHistory.AvgScore;
                Assert.Equal(20, UserHighScore);
                Assert.Equal(15, UserAvgScore);
            }
        }
        [Fact]
        public async void Top10ScoresByGameIDShouldGetTheTop10Scores()
        { 
            using (var context = new PartyGamesDBContext(_options))
            {
                IGameRepository repo = new GameRepository(context);
                int gameId = 1;
                List<ScoreHistory> top10 = new List<ScoreHistory>();

                top10 = await repo.Top10ScoresByGameIdAsync(gameId);

                Assert.NotNull(top10);
                Assert.NotEmpty(top10);
                Assert.Equal(10,top10.Count);
                Assert.Equal(7, top10[0].Id);
                Assert.Equal(1, top10[0].GamesId);
                Assert.Equal(2, top10[0].UserId);
                Assert.Equal(16000, top10[0].Score);
            }
        }
        [Fact]
        public async void UpdateSnakeGameStatsByScoreHistoryShouldUpdateSnakeGameStats()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                ScoreHistory scoreHistoryToUpdate = new ScoreHistory
                {
                    Id = 1,
                    GamesId = 1,
                    UserId = 1,
                    Score = 10000,
                };

                await repo.UpdateSnakeGameStatsByScoreHistory(scoreHistoryToUpdate);
                Snake newStat = await repo.GetSnakeGameStatsByUserIdAsync(scoreHistoryToUpdate.UserId);


                Assert.Equal(1, newStat.UserId);
                Assert.Equal(1, newStat.GamesId);
                Assert.Equal(1600, newStat.HighScore);
                Assert.Equal(1550,newStat.AvgScore);
            }
        }
        [Fact]
        public async void UpdateTicTacToeGameStatsByScoreHistoryShouldUpdateTicTacToe()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                ScoreHistory scoreHistoryToUpdate = new ScoreHistory
                {
                    GamesId = 3,
                    UserId = 1,
                };

                await repo.UpdateTicTacToeGameStatsByScoreHistory(scoreHistoryToUpdate);
                TicTacToe newStat = await repo.GetTicTacToeGameStatsByUserIdAsync(scoreHistoryToUpdate.UserId);


                Assert.Equal(1, newStat.UserId);
                Assert.Equal(3, newStat.GamesId);
                Assert.Equal(0.5, newStat.WinLossRatio);
            }
        }

        [Fact]
        public async void GetTicTacToeGameStatsByUserIdShouldGetTicTacToeGamestats()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                int userId = 1;

                TicTacToe gameStats = await repo.GetTicTacToeGameStatsByUserIdAsync(userId);


                Assert.Equal(3, gameStats.GamesId);
                Assert.Equal(1, gameStats.UserId);
                Assert.Equal(1.44f, gameStats.WinLossRatio);
            }
        }
        [Theory]
        [InlineData(1, "TestUserName1", "TestPassword1")]
        [InlineData(2, "TestUserName2", "TestPassword2")]
        public async void GetUserFromUserIdShouldGetUser(int p_id, string p_username, string p_password)
        {
            using(var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                int userId = p_id;

                User foundUser = await repo.GetUserFromUserIdAsync(userId);

                Assert.Equal(p_id, foundUser.Id);
                Assert.Equal(p_username, foundUser.UserName);
                Assert.Equal(p_password, foundUser.Password);
            }
        }
        [Fact]
        public async void AddScoreHistoryShouldAddScoreHistory()
        {
            using(var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                ScoreHistory newScoreHistory = new ScoreHistory
                { 
                    GamesId = 1,
                    UserId = 1,
                    Score = 10000,
                };
               await repo.AddScoreHistory(newScoreHistory);
                List<ScoreHistory> totalScoreHistory = await repo.GetScoreHistoryByUserIdAsync(1);

                Assert.Equal(5, totalScoreHistory.Count);
            }
        }

        [Fact]
        public async void AddScoreHistoryShouldAddScoreHistory2()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);


                int GamesId = 1;
                int UserId = 1;
                float Score = 10000;
          
                await repo.AddScoreHistory(UserId,GamesId,Score);
                List<ScoreHistory> totalScoreHistory = await repo.GetScoreHistoryByUserIdAsync(1);

                Assert.Equal(5, totalScoreHistory.Count);
            }
        }
        private void Seed()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                
                context.Games.AddRange(
                    new Games
                    {
                        Id = 1,
                        Name = "Test SnakeGame Name",
                        Description = "Snake Description",
                    },
                    new Games
                    {
                        Id = 2,
                        Name = "Test BlackjackGame Name",
                        Description = "BlackJack Description"
                    },
                    new Games
                    {
                        Id = 3,
                        Name = "Test TicTacToeGames Name",
                        Description="Calebs Awesome TTT Game"
                    }
                );
                context.Users.AddRange(
                    new User
                    {
                        Id = 1,
                        UserName = "TestUserName1",
                        Password = "TestPassword1",
                    },
                    new User
                    {
                        Id = 2,
                        UserName = "TestUserName2",
                        Password = "TestPassword2",
                    }
                );
                context.Snakes.AddRange(
                    new Snake
                    {
                        Id = 1,
                        UserId = 1,
                        GamesId = 1,
                        AvgScore = 15,
                        HighScore = 20,
                    },
                    new Snake
                    {
                        Id = 2,
                        UserId = 2,
                        GamesId = 1,
                        AvgScore = 20,
                        HighScore = 30,
                    }
                );
                context.Blackjacks.AddRange(
                    new Blackjack
                    {
                        Id = 1,
                        UserId = 1,
                        GamesId = 2,
                        WinLossRatio = 0.80f,
                    },
                    new Blackjack
                    {
                        Id = 2,
                        UserId = 2,
                        GamesId = 2,
                        WinLossRatio = 1.55f,
                    }
                );
                context.TicTacToes.AddRange(
                    new TicTacToe
                    {
                        Id=1,
                        UserId =1,
                        GamesId =3,
                        WinLossRatio=1.44f
                    }
                    );
                context.ScoreHistories.AddRange(
                    new ScoreHistory
                    {
                        Id = 1,
                        GamesId = 1,
                        UserId = 1,
                        Score = 1500,
                    },
                    new ScoreHistory
                    {
                        Id = 2,
                        GamesId = 1,
                        UserId = 2,
                        Score = 1600,
                    },
                    new ScoreHistory
                    {
                        Id = 3,
                        GamesId = 1,
                        UserId = 2,
                        Score = 600,
                    },
                    new ScoreHistory
                    {
                        Id = 4,
                        GamesId = 1,
                        UserId = 2,
                        Score = 100,
                    },
                    new ScoreHistory
                    {
                        Id = 5,
                        GamesId = 1,
                        UserId = 2,
                        Score = 1800,
                    },
                    new ScoreHistory
                    {
                        Id = 6,
                        GamesId = 1,
                        UserId = 1,
                        Score = 1600,
                    },
                    new ScoreHistory
                    {
                        Id = 7,
                        GamesId = 1,
                        UserId = 2,
                        Score = 16000,
                    },
                    new ScoreHistory
                    {
                        Id = 8,
                        GamesId = 1,
                        UserId = 2,
                        Score = 1500,
                    },
                    new ScoreHistory
                    {
                        Id = 9,
                        GamesId = 1,
                        UserId = 2,
                        Score = 1100,
                    },
                    new ScoreHistory
                    {
                        Id = 10,
                        GamesId = 1,
                        UserId = 2,
                        Score = 160,
                    },
                    new ScoreHistory
                    {
                        Id = 11,
                        GamesId = 1,
                        UserId = 2,
                        Score = 16,
                    },
                    new ScoreHistory
                    {
                        Id = 12,
                        GamesId = 3,
                        UserId = 1,
                        Score = 0,
                    },
                    new ScoreHistory
                    {
                        Id = 13,
                        GamesId = 3,
                        UserId = 1,
                        Score = 1,
                    }

                );
                context.SaveChanges();
            }
        }
    }
}
