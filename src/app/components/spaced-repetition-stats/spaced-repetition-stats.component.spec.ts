import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacedRepetitionStatsComponent } from './spaced-repetition-stats.component';

describe('SpacedRepetitionStatsComponent', () => {
  let component: SpacedRepetitionStatsComponent;
  let fixture: ComponentFixture<SpacedRepetitionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpacedRepetitionStatsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacedRepetitionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
