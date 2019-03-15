import { Component, OnInit } from '@angular/core';
import { NbaScore } from '../nba-score';
import { NbaScoreService } from '../nba-score.service';
import { NbaScoreDetailsComponent } from '../nba-score-details/nba-score-details.component';

@Component({
  selector: 'app-nba-score-list',
  templateUrl: './nba-score-list.component.html',
  styleUrls: ['./nba-score-list.component.css']
})
export class NbaScoreListComponent implements OnInit {

  scores: NbaScore[]
  selectedScore: NbaScore

  constructor(private nbaScoreService: NbaScoreService) { }

  ngOnInit() {
     this.nbaScoreService
      .getScores()
      .then((scores: NbaScore[]) => {
        this.scores = scores["games"].map((score) => {
          return score;
        });
      });
  }

  private getIndexOfScore = (scoreId: String) => {
    return this.scores.findIndex((score) => {
      return score._id === scoreId;
    });
  }

  selectScore(score: NbaScore) {
    this.selectedScore = score
  }

}
