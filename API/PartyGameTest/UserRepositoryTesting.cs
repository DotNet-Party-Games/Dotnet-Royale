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
    public class UserRepositoryTesting
    {
        private readonly DbContextOptions<PartyGamesDBContext> _options;
        public UserRepositoryTesting()
        {
            //is "Filename = Test.db" necessary and where is it pointing?
            _options = new DbContextOptionsBuilder<PartyGamesDBContext>().UseSqlite("Filename = Test.db").Options;
            this.Seed();
        }

        [Fact]
        public void GetAllUsersShouldGetAllUsers()
        {
            using (var context = new PartyGamesDBContext(_options))
            {
                IUserRepository repo = new UserRepository(context);
                List <User> allUsers = repo.GetAllUsers();
                int numOfUsers = allUsers.Count;
                Assert.Equal(2, numOfUsers);
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
                    }
                );
                context.Users.AddRange(
                    new User
                    {
                        Id = 1,
                        UserName = "TestUserName1",
                        Password = "TestPassword1",
                        IsAdmin = true,
                    },
                    new User
                    {
                        Id = 2,
                        UserName = "TestUserName2",
                        Password = "TestPassword2",
                        IsAdmin = false,
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
                        WinLossRatio = 0.80,
                    },
                    new Blackjack
                    {
                        Id = 2,
                        UserId = 2,
                        GamesId = 2,
                        WinLossRatio = 1.55,
                    }
                );
                context.ScoreHistories.AddRange(
                    new ScoreHistory
                    {
                        Id = 1,
                        GameId = 1,
                        UserId = 1,
                        Score = 1500,
                    },
                    new ScoreHistory
                    {
                        Id = 2,
                        GameId = 1,
                        UserId = 2,
                        Score = 1600,
                    }
                );
            }
        }
    }
}
