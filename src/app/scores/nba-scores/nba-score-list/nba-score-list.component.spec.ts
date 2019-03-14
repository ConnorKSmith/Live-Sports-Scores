import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaScoreListComponent } from './nba-score-list.component';

describe('NbaScoreListComponent', () => {
  let component: NbaScoreListComponent;
  let fixture: ComponentFixture<NbaScoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaScoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
