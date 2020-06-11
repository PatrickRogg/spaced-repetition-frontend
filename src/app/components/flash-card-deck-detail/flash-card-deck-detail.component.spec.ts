import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardDeckDetailComponent } from './flash-card-deck-detail.component';

describe('FlashCardDeckDetailComponent', () => {
  let component: FlashCardDeckDetailComponent;
  let fixture: ComponentFixture<FlashCardDeckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashCardDeckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardDeckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
