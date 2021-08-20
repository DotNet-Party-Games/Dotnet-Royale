using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PartyGameBL;
using PartyGameDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyGameWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PartyGamesDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Reference2DB")));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PartyGameWebAPI", Version = "v1" });
            });

            services.AddScoped<IGameRepository, GameRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserBL, UserBL>();
            services.AddScoped<IGameBL, GameBL>();
            //configuring Cors in our web api to accept the local address in our angular project
            services.AddCors(
                (builder) => {
                    builder.AddDefaultPolicy((policy) =>
                        {
                            policy.WithOrigins("http://127.0.0.1:4200","http://127.0.0.1:5000", "https://p2partygames.azurewebsites.net/", "http://20.185.11.71/") //this is where you state the address that you want to trust
                                .AllowAnyHeader() //allows any header
                                .AllowAnyMethod(); //allows any http verb method
                        }
                    );
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PartyGameWebAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
