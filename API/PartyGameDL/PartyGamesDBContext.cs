using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyGameModels;
namespace PartyGameDL
{
    public class PartyGamesDBContext : DbContext
    {
        public DbSet<Games> Games { get; set; }
        public DbSet<Blackjack> Blackjacks { get; set; }
        public DbSet<Snake> Snakes { get; set; }
        public DbSet<LightBike> LightBikes { get; set; }
        public DbSet<ScoreHistory> ScoreHistories{get;set;}
        public DbSet<TicTacToe> TicTacToes {get; set; }


        public PartyGamesDBContext() : base()
        { }
        public PartyGamesDBContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Games>()
                .Property(Games => Games.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<LightBike>()
                .Property(LightBike => LightBike.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Snake>()
                .Property(Snake => Snake.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ScoreHistory>()
                .Property(ScoreHistory => ScoreHistory.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Blackjack>()
                .Property(Blackjack => Blackjack.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<TicTacToe>()
                .Property(TicTacToe => TicTacToe.Id)
                .ValueGeneratedOnAdd();
            //add Entity modelbuilders here.
        }
    }
}