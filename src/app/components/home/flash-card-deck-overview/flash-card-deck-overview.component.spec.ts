import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardDeckOverviewComponent } from './flash-card-deck-overview.component';

describe('FlashCardDeckOverviewComponent', () => {
  let component: FlashCardDeckOverviewComponent;
  let fixture: ComponentFixture<FlashCardDeckOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashCardDeckOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardDeckOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
