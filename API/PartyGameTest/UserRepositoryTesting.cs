using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyGameDL;
using PartyGameModels;
using Xunit;

namespace PartyGameTest
{
    public class UserRepositoryTesting
    {
        private readonly DbContextOptions<PartyGamesDBContext> _options;
        public UserRepositoryTesting()
        {
            //is "Filename = PartyGameTest.db" necessary and where is it pointing?
            _options = new DbContextOptionsBuilder<PartyGamesDBContext>().UseSqllite("Filename = PartyGameTest.db").Options;
        }
    }
}
