import { DoBootstrap, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { GameBoardComponent } from './game-board/game-board.component';


import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { LivechatComponent } from './livechat/livechat.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { RegisterComponent } from './register/register.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
// import { SnakeComponent } from './snake/snake.component';

import { PartygameService } from './services/partygame.service';
import { AuthGuard } from './services/auth.guard';
import { SquareComponent } from './tictactoe/square/square.component';
import { BoardComponent } from './tictactoe/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    LoginComponent,
    LivechatComponent,
    GamelistComponent,
    RegisterComponent,
    LeaderboardComponent,
    SquareComponent,
    BoardComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "Login", component: LoginComponent},
      {path: "Register", component: RegisterComponent},
      { path: 'layout',
        component: LayoutComponent,
        canActivate: [AuthGuard]
      },
    ]),
    NgbModule
  ],
  providers: [PartygameService,AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule{}
// export class AppModule implements DoBootstrap { 

//   constructor(injector: Injector) {
//     const snakeComponent = createCustomElement(SnakeComponent, { injector });
//     customElements.define('ng-snake', snakeComponent);
//   }

//   ngDoBootstrap(){}
// }

