import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceEditorComponent } from './workspace-editor.component';

describe('WorkspaceEditorComponent', () => {
  let component: WorkspaceEditorComponent;
  let fixture: ComponentFixture<WorkspaceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
