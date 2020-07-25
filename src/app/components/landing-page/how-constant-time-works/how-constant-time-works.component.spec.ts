import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowConstantTimeWorksComponent } from './how-constant-time-works.component';

describe('HowConstantTimeWorksComponent', () => {
  let component: HowConstantTimeWorksComponent;
  let fixture: ComponentFixture<HowConstantTimeWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowConstantTimeWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowConstantTimeWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
