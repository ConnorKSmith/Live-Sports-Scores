import { TestBed } from '@angular/core/testing';

import { NbaScoreService } from './nba-score.service';

describe('NbaScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NbaScoreService = TestBed.get(NbaScoreService);
    expect(service).toBeTruthy();
  });
});
