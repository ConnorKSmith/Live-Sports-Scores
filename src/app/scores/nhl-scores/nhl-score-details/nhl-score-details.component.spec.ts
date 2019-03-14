import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlScoreDetailsComponent } from './nhl-score-details.component';

describe('NhlScoreDetailsComponent', () => {
  let component: NhlScoreDetailsComponent;
  let fixture: ComponentFixture<NhlScoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlScoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlScoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
