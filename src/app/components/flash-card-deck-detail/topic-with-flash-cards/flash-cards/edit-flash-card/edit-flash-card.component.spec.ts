import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlashCardComponent } from './edit-flash-card.component';

describe('EditFlashCardComponent', () => {
  let component: EditFlashCardComponent;
  let fixture: ComponentFixture<EditFlashCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFlashCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
