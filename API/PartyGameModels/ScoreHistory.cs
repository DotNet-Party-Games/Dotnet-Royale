using System;
using System.Collections.Generic;

namespace PartyGameModels
{

    public class ScoreHistory
    {
        public ScoreHistory() {}

        public int Id { get; set; }
        public int GamesId { get; set; }
        public int UserId { get; set; }
        public double Score { get; set; }
        public DateTime Time { get; set; }
        
    }
}
