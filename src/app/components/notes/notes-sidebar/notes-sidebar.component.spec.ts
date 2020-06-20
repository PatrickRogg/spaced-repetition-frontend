import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSidebarComponent } from './notes-sidebar.component';

describe('NotesSidebarComponent', () => {
  let component: NotesSidebarComponent;
  let fixture: ComponentFixture<NotesSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
