import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaScoreDetailsComponent } from './nba-score-details.component';

describe('NbaScoreDetailsComponent', () => {
  let component: NbaScoreDetailsComponent;
  let fixture: ComponentFixture<NbaScoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaScoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaScoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
