import { Injectable } from '@angular/core';
import { Score } from './score';
import { Http, Response } from '@angular/http';

@Injectable()
export class ScoreService {
    private scoresUrl = '/api/scores';

    constructor (private http: Http) {}

    // get("/api/scores")
    getScores(): Promise<void | Score[]> {
      return this.http.get(this.scoresUrl)
                 .toPromise()
                 .then(response => response.json() as Score[])
                 .catch(this.handleError);
    }

    // post("/api/scores")
    createScore(newScore: Score): Promise<void | Score> {
      return this.http.post(this.scoresUrl, newScore)
                 .toPromise()
                 .then(response => response.json() as Score)
                 .catch(this.handleError);
    }

    // get("/api/scores/:id") endpoint not used by Angular app

    // delete("/api/scores/:id")
    deleteScore(delScoreId: String): Promise<void | String> {
      return this.http.delete(this.scoresUrl + '/' + delScoreId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/scores/:id")
    updateScore(putScore: Score): Promise<void | Score> {
      var putUrl = this.scoresUrl + '/' + putScore._id;
      return this.http.put(putUrl, putScore)
                 .toPromise()
                 .then(response => response.json() as Score)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}