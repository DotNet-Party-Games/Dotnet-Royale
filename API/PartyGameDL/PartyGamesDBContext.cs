using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyGameModels;
namespace PartyGameDL
{
    public class PartyGamesDBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Games> Games { get; set; }
        public DbSet<Blackjack> Blackjacks { get; set; }
        public DbSet<Snake> Snakes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ScoreHistory> ScoreHistories{get;set;}


        public PartyGamesDBContext() : base()
        { }
        public PartyGamesDBContext(DbContextOptions options) : base(options)
        { }

       /* protected override void OnConfiguring(DbContextOptionsBuilder p_options)
        {
            p_options.UseSqlServer(@"Server=tcp:revature-suraj-kalika.database.windows.net,1433;Initial Catalog=partyGamesDB;Persist Security Info=False;User ID=surajkalika;Password=Dawnking12;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }*/
        protected override void OnModelCreating(ModelBuilder p_modelBuilder)
        {
            p_modelBuilder.Entity<Games>()
                .Property(Games => Games.Id)
                .ValueGeneratedOnAdd();

            p_modelBuilder.Entity<User>()
                .Property(User => User.Id)
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
            //add Entity modelbuilders here.
        }
    }
}