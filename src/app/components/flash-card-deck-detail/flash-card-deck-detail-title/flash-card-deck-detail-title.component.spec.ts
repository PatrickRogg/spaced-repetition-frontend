import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardDeckDetailTitleComponent } from './flash-card-deck-detail-title.component';

describe('FlashCardDeckDetailTitleComponent', () => {
  let component: FlashCardDeckDetailTitleComponent;
  let fixture: ComponentFixture<FlashCardDeckDetailTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashCardDeckDetailTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardDeckDetailTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
