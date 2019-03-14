import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ScoreDetailsComponent } from './scores/score-details/score-details.component';
import { ScoreListComponent } from './scores/score-list/score-list.component';
import { TestComponent } from './static/test/test.component';

//NBA
import { NbaScoreListComponent } from './scores/nba-scores/nba-score-list/nba-score-list.component';
import { NbaScoreDetailsComponent } from './scores/nba-scores/nba-score-details/nba-score-details.component';

//NHL
import { NhlScoreListComponent } from './scores/nhl-scores/nhl-score-list/nhl-score-list.component';
import { NhlScoreDetailsComponent } from './scores/nhl-scores/nhl-score-details/nhl-score-details.component';


const routes: Routes = [
  { path: '', component: TestComponent, pathMatch: 'full'},
  { path: 'scores', component: ScoreListComponent},
  { path: 'nhl-scores', component: NhlScoreListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
