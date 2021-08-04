import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Layout1Component } from './layout1/layout1.component';
import { Top1Component } from './top1/top1.component';
import { Left1Component } from './left1/left1.component';
import { Main1Component } from './main1/main1.component';
import { Right1Component } from './right1/right1.component';
import { Bottom1Component } from './bottom1/bottom1.component';

@NgModule({
  declarations: [
    AppComponent,
    Layout1Component,
    Top1Component,
    Left1Component,
    Main1Component,
    Right1Component,
    Bottom1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
