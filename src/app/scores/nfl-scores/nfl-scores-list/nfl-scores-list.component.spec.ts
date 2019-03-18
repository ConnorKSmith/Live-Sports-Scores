import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NflScoresListComponent } from './nfl-scores-list.component';

describe('NflScoresListComponent', () => {
  let component: NflScoresListComponent;
  let fixture: ComponentFixture<NflScoresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NflScoresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NflScoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
