import { Component, OnInit } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from '../score.service';
import { ScoreDetailsComponent } from '../score-details/score-details.component';

@Component({
  selector: 'score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css'],
  providers: [ScoreService]
})

export class ScoreListComponent implements OnInit {

  scores: Score[]
  selectedScore: Score

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
     this.scoreService
      .getScores()
      .then((scores: Score[]) => {
        this.scores = scores.map((score) => {
          return score;
        });
      });
  }

  private getIndexOfScore = (scoreId: String) => {
    return this.scores.findIndex((score) => {
      return score._id === scoreId;
    });
  }

  selectScore(score: Score) {
    this.selectedScore = score
  }

  createNewScore() {
    var score: Score = {
		home_team: "",
		home_score:	0,
		away_team: "",
		away_score: 0,
		time_remaining: "",
		date: ""
    };

    // By default, a newly-created score will have the selected state.
    this.selectScore(score);
  }

  deleteScore = (scoreId: String) => {
    var idx = this.getIndexOfScore(scoreId);
    if (idx !== -1) {
      this.scores.splice(idx, 1);
      this.selectScore(null);
    }
    return this.scores;
  }

  addScore = (score: Score) => {
    this.scores.push(score);
    this.selectScore(score);
    return this.scores;
  }

  updateScore = (score: Score) => {
    var idx = this.getIndexOfScore(score._id);
    if (idx !== -1) {
      this.scores[idx] = score;
      this.selectScore(score);
    }
    return this.scores;
  }
}