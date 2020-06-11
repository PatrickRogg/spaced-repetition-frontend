import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacedRepetitionComponent } from './spaced-repetition.component';

describe('SpacedRepetitionComponent', () => {
  let component: SpacedRepetitionComponent;
  let fixture: ComponentFixture<SpacedRepetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacedRepetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacedRepetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
