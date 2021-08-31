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

        protected override void OnConfiguring(DbContextOptionsBuilder p_options)
        {
            p_options.UseSqlServer(@"Server=tcp:revbox.database.windows.net,1433;Initial Catalog=PartyGamesDB;Persist Security Info=False;User ID=revbox;Password=R3vb0xP@55;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
        protected override void OnModelCreating(ModelBuilder p_modelBuilder)
        {
            p_modelBuilder.Entity<Games>()
                .Property(Games => Games.Id)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<LightBike>()
                .Property(LightBike => LightBike.Id)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<Snake>()
                .Property(Snake => Snake.Id)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<ScoreHistory>()
                .Property(ScoreHistory => ScoreHistory.Id)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<Blackjack>()
                .Property(Blackjack => Blackjack.Id)
                .ValueGeneratedOnAdd();
            p_modelBuilder.Entity<TicTacToe>()
                .Property(TicTacToe => TicTacToe.Id)
                .ValueGeneratedOnAdd();
            //add Entity modelbuilders here.
        }
    }
}