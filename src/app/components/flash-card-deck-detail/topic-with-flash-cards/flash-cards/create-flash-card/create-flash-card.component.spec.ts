import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlashCardComponent } from './create-flash-card.component';

describe('CreateFlashCardComponent', () => {
  let component: CreateFlashCardComponent;
  let fixture: ComponentFixture<CreateFlashCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFlashCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
