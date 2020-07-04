import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRepetitionComponent } from './sidebar-repetition.component';

describe('SidebarRepetitionComponent', () => {
  let component: SidebarRepetitionComponent;
  let fixture: ComponentFixture<SidebarRepetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRepetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRepetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
