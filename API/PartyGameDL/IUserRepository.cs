using System;
using System.Collections.Generic;
using PartyGameModels;
namespace PartyGameDL
{
    public interface IUserRepository
    {
        List<ScoreHistory> GetScoreHistoryByUserId(int UserId);
        Snake GetSnakeGameStatsByUserId(int UserId);
        Blackjack GetBlackJackGameStatsByUserId(int UserId);

        List<User> GetAllUsers();
        User AddUser(User p_user);
    }
}