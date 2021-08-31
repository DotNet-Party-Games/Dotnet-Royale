using System;
using System.Collections.Generic;

namespace PartyGameModels
{
    public class Games
    {
        public Games(){}

        public int Id{get;set;}
        public string Name { get; set; }   
        public string Description { get; set; }
        public ICollection<ScoreHistory> GameScoreHistories { get; set; }
        public ICollection<Blackjack> Blackjacks { get; set; }
        public ICollection<Snake> Snakes { get; set; }
        public ICollection<TicTacToe> TicTacToes{get;set;}
        public ICollection<LightBike> LightBikes{get;set;}
        
    }
}
