using System;

namespace PartyGameModels
{
    public class Blackjack
    {
        public Blackjack()  {}

        public int Id { get; set; }
        public string UserName { get; set; }
        public int GamesId { get; set; }
        public double WinLossRatio { get; set; }
    }
}