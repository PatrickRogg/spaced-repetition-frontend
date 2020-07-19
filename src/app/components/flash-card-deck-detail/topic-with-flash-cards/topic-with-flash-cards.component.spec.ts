import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicWithFlashCardsComponent } from './topic-with-flash-cards.component';

describe('TopicWithFlashCardsComponent', () => {
  let component: TopicWithFlashCardsComponent;
  let fixture: ComponentFixture<TopicWithFlashCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicWithFlashCardsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicWithFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
