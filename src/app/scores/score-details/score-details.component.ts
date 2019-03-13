import { Component, Input } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from '../score.service';

@Component({
  selector: 'score-details',
  templateUrl: './score-details.component.html',
  styleUrls: ['./score-details.component.css']
})

export class ScoreDetailsComponent {
  @Input()
  score: Score;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private scoreService: ScoreService) {}

  createScore(score: Score) {
    this.scoreService.createScore(score).then((newScore: Score) => {
      this.createHandler(newScore);
    });
  }

  updateScore(score: Score): void {
    this.scoreService.updateScore(score).then((updatedScore: Score) => {
      this.updateHandler(updatedScore);
    });
  }

  deleteScore(scoreId: String): void {
    this.scoreService.deleteScore(scoreId).then((deletedScoreId: String) => {
      this.deleteHandler(deletedScoreId);
    });
  }
}