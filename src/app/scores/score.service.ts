import { Injectable } from '@angular/core';
import { score } from './score';
import { Http, Response } from '@angular/http';

@Injectable()
export class ScoreService {
    private scoresUrl = '/api/scores';

    constructor (private http: Http) {}

    // get("/api/scores")
    getscores(): Promise<void | score[]> {
      return this.http.get(this.scoresUrl)
                 .toPromise()
                 .then(response => response.json() as score[])
                 .catch(this.handleError);
    }

    // post("/api/scores")
    createscore(newscore: score): Promise<void | score> {
      return this.http.post(this.scoresUrl, newscore)
                 .toPromise()
                 .then(response => response.json() as score)
                 .catch(this.handleError);
    }

    // get("/api/scores/:id") endpoint not used by Angular app

    // delete("/api/scores/:id")
    deletescore(delscoreId: String): Promise<void | String> {
      return this.http.delete(this.scoresUrl + '/' + delscoreId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/scores/:id")
    updatescore(putscore: score): Promise<void | score> {
      var putUrl = this.scoresUrl + '/' + putscore._id;
      return this.http.put(putUrl, putscore)
                 .toPromise()
                 .then(response => response.json() as score)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}