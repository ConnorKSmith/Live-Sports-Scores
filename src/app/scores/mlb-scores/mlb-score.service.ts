import { Injectable } from '@angular/core';
import { MlbScore } from './mlb-score';
import { Http, Response } from '@angular/http';

@Injectable()
export class MlbScoreService {
    private scoresUrl = '/api/getMLBScores';

    constructor (private http: Http) {}

    // get("/api/getMLBScores")
    getScores(): Promise<void | MlbScore[]> {
      return this.http.get(this.scoresUrl)
                 .toPromise()
                 .then(response => response.json() as MlbScore[])
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}