import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacedRepetitionStatsOverviewComponent } from './spaced-repetition-stats-overview.component';

describe('SpacedRepetitionStatsOverviewComponent', () => {
  let component: SpacedRepetitionStatsOverviewComponent;
  let fixture: ComponentFixture<SpacedRepetitionStatsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpacedRepetitionStatsOverviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacedRepetitionStatsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
