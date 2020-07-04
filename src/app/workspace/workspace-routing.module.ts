import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceHomeComponent } from './components/workspace-home/workspace-home.component';
import { WorkspaceEditorComponent } from './components/workspace-editor/workspace-editor.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'home',
        component: WorkspaceHomeComponent,
      },
      {
        path: 'files/:id',
        component: WorkspaceEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
