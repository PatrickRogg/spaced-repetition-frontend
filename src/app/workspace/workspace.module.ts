import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarFileComponent } from './components/sidebar/sidebar-file/sidebar-file.component';
import { SidebarFolderComponent } from './components/sidebar/sidebar-folder/sidebar-folder.component';
import { WorkspaceHomeComponent } from './components/workspace-home/workspace-home.component';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceEditorComponent } from './components/workspace-editor/workspace-editor.component';
import { WorkspaceEditorFlashcardsComponent } from './components/workspace-editor/workspace-editor-flashcards/workspace-editor-flashcards.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarFileComponent,
    SidebarFolderComponent,
    WorkspaceHomeComponent,
    WorkspaceComponent,
    WorkspaceEditorComponent,
    WorkspaceEditorFlashcardsComponent,
  ],
  imports: [CommonModule, WorkspaceRoutingModule, SharedModule],
})
export class WorkspaceModule {}
