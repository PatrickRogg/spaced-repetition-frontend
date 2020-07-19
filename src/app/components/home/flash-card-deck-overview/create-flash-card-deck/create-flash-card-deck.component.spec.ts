import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlashCardDeckComponent } from './create-flash-card-deck.component';

describe('CreateFlashCardDeckComponent', () => {
  let component: CreateFlashCardDeckComponent;
  let fixture: ComponentFixture<CreateFlashCardDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFlashCardDeckComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlashCardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
