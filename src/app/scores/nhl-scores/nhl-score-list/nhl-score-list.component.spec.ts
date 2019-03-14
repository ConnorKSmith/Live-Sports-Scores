import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlScoreListComponent } from './nhl-score-list.component';

describe('NhlScoreListComponent', () => {
  let component: NhlScoreListComponent;
  let fixture: ComponentFixture<NhlScoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlScoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
