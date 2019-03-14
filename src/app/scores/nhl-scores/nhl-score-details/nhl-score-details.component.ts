import { Component, OnInit, Input } from '@angular/core';
import { NhlScore } from '../nhl-score';
import { NhlScoreService } from '../nhl-score.service';

@Component({
  selector: 'nhl-score-details',
  templateUrl: './nhl-score-details.component.html',
  styleUrls: ['./nhl-score-details.component.css']
})
export class NhlScoreDetailsComponent {
	
  @Input()
  nhlScore: NhlScore;

  constructor() { }

  ngOnInit() {
  }

}
