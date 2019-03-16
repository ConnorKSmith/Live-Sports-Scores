import { Component, OnInit } from '@angular/core';
import { NhlScore } from '../nhl-score';
import { NhlScoreService } from '../nhl-score.service';
import { NhlScoreDetailsComponent } from '../nhl-score-details/nhl-score-details.component';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-nhl-score-list',
  templateUrl: './nhl-score-list.component.html',
  styleUrls: ['./nhl-score-list.component.css']
})
export class NhlScoreListComponent implements OnInit {

  scores: NhlScore[]
  selectedScore: NhlScore

  constructor(private nhlScoreService: NhlScoreService, 
  			  public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
     this.nhlScoreService
      .getScores()
      .then((scores: NhlScore[]) => {
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

  selectScore(score: NhlScore) {
  	this.ngxSmartModalService.setModalData(score, 'myModal', true);
    this.selectedScore = score;
  }

}
