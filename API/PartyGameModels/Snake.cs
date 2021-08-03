using System;

namespace PartyGameModels
{
    public class Snake
    {
        public Snake(){}

        public int Id { get; set; }
        public int UserId { get; set; }
        public int GamesId { get; set; }
        public double AvgScore { get; set; }
        public double HighScore { get; set; }
    }
}