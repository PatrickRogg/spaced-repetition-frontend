import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'angular-tree-component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WorkspaceHomeComponent } from './components/workspace-home/workspace-home.component';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceEditorComponent } from './components/workspace-editor/workspace-editor.component';
import { WorkspaceEditorFlashcardsComponent } from './components/workspace-editor/workspace-editor-flashcards/workspace-editor-flashcards.component';
import { SidebarDocumentComponent } from './components/sidebar/sidebar-document/sidebar-document.component';
import { SidebarRepetitionComponent } from './components/sidebar/sidebar-repetition/sidebar-repetition.component';

@NgModule({
  declarations: [
    SidebarComponent,
    WorkspaceHomeComponent,
    WorkspaceComponent,
    WorkspaceEditorComponent,
    WorkspaceEditorFlashcardsComponent,
    SidebarDocumentComponent,
    SidebarRepetitionComponent,
  ],
  imports: [CommonModule, WorkspaceRoutingModule, SharedModule, TreeModule.forRoot()],
})
export class WorkspaceModule {}
