import { Component, OnInit, Input } from '@angular/core';
import { NbaScore } from '../nba-score';
import { NbaScoreService } from '../nba-score.service';

@Component({
  selector: 'nba-score-details',
  templateUrl: './nba-score-details.component.html',
  styleUrls: ['./nba-score-details.component.css']
})
export class NbaScoreDetailsComponent {
	
  @Input()
  nbaScore: NbaScore;

  constructor() { }

  ngOnInit() {
  }

}
