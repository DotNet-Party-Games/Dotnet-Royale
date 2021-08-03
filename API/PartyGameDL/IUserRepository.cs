using System;
using System.Collections.Generic;
using PartyGameModels;
namespace PartyGameDL
{
    public interface IUserRepository
    {
        List<ScoreHistory> GetScoreHistoryByUserId(int UserId);
        List<Snake> GetSnakeGameStatsByUserId(int UserId);
        List<Blackjack> GetBlackJackGameStatsByUserId(int UserId);

        List<User> GetAllUsers();
        User AddUser(User p_user);
    }
}