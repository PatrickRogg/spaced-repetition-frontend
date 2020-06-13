import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageFlashCardComponent } from './landing-page-flash-card.component';

describe('LandingPageFlashCardComponent', () => {
  let component: LandingPageFlashCardComponent;
  let fixture: ComponentFixture<LandingPageFlashCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageFlashCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
