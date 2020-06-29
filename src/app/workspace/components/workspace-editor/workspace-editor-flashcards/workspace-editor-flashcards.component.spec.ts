import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceEditorFlashcardsComponent } from './workspace-editor-flashcards.component';

describe('WorkspaceEditorFlashcardsComponent', () => {
  let component: WorkspaceEditorFlashcardsComponent;
  let fixture: ComponentFixture<WorkspaceEditorFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceEditorFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceEditorFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
