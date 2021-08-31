using System;

namespace PartyGameModels
{
    public class LightBike
    {
        public LightBike(){}

        public int Id { get; set; }
        public string UserName { get; set; }
        public int GamesId { get; set; }
        public double WinLossRatio { get; set; }
    }
}