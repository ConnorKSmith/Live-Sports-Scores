import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';

import { ContactService } from './contacts/contact.service';
import { ScoreService } from './scores/score.service';

import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ScoreDetailsComponent } from './scores/score-details/score-details.component';
import { ScoreListComponent } from './scores/score-list/score-list.component';
import { TestComponent } from './static/test/test.component';

// NBA
import { NbaScoreService } from './scores/nba-scores/nba-score.service';
import { NbaScoreListComponent } from './scores/nba-scores/nba-score-list/nba-score-list.component';
import { NbaScoreDetailsComponent } from './scores/nba-scores/nba-score-details/nba-score-details.component';

// NHL
import { NhlScoreService } from './scores/nhl-scores/nhl-score.service';
import { NhlScoreListComponent } from './scores/nhl-scores/nhl-score-list/nhl-score-list.component';
import { NhlScoreDetailsComponent } from './scores/nhl-scores/nhl-score-details/nhl-score-details.component';

// Static
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    ScoreDetailsComponent,
    ScoreListComponent,
    TestComponent,
    NbaScoreListComponent,
    NbaScoreDetailsComponent,
    NhlScoreListComponent,
    NhlScoreDetailsComponent,
    HeaderComponent,
    FooterComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    ContactService,
    ScoreService,
    NhlScoreService,
    NbaScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
