using System;
namespace PartyGameModels
{
    public class TicTacToe
    {
        public TicTacToe(){}
        public int Id {get; set;}
        public int UserId { get; set; }
        public int GamesId { get; set; }
        public double WinLossRatio { get; set; }
    }
}