using System;
using System.Collections.Generic;
namespace PartyGameModels
{
    public class User
    {
        public User(){}

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }

        public ICollection<ScoreHistory> UserScoreHistories{get;set;}
        public Blackjack BjStats { get; set; }
        public Snake SnakeStats { get; set; }
    }
}