import { Component, OnInit } from '@angular/core';
import { MlbScore } from '../mlb-score';
import { MlbScoreService } from '../mlb-score.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-mlb-scores-list',
  templateUrl: './mlb-scores-list.component.html',
  styleUrls: ['./mlb-scores-list.component.css']
})
export class MlbScoresListComponent implements OnInit {

  scores: MlbScore[]
  selectedScore: MlbScore

  constructor(private mlbScoreService: MlbScoreService, 
  			  public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
     this.mlbScoreService
      .getScores()
      .then((scores: MlbScore[]) => {
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

  selectScore(score: MlbScore) {
  	this.ngxSmartModalService.setModalData(score, 'myModal', true);
    this.selectedScore = score;
  }

}
