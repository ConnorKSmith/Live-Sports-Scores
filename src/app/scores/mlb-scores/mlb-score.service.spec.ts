import { TestBed } from '@angular/core/testing';

import { MlbScoreService } from './mlb-score.service';

describe('MlbScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlbScoreService = TestBed.get(MlbScoreService);
    expect(service).toBeTruthy();
  });
});
