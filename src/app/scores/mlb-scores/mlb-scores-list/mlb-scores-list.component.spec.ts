import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbScoresListComponent } from './mlb-scores-list.component';

describe('MlbScoresListComponent', () => {
  let component: MlbScoresListComponent;
  let fixture: ComponentFixture<MlbScoresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlbScoresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlbScoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
