import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacedRepetitionStatsDetailComponent } from './spaced-repetition-stats-detail.component';

describe('SpacedRepetitionStatsDetailComponent', () => {
  let component: SpacedRepetitionStatsDetailComponent;
  let fixture: ComponentFixture<SpacedRepetitionStatsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacedRepetitionStatsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacedRepetitionStatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
