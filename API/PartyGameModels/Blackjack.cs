using System;

namespace PartyGameModels
{
    public class Blackjack
    {
        public Blackjack()  {}

        public int Id { get; set; }
        public int UserId { get; set; }
        public int GamesId { get; set; }
        public float WinLossRatio { get; set; }
    }
}