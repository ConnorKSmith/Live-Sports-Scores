import { TestBed } from '@angular/core/testing';

import { NhlScoreService } from './nhl-score.service';

describe('NhlScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhlScoreService = TestBed.get(NhlScoreService);
    expect(service).toBeTruthy();
  });
});
