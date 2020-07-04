import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';
import { FileSystemService } from 'src/app/workspace/services/file-system.service';
import { FileApiService } from 'src/app/services/api/file-api.service';
import {
  FileSystem,
  Folder,
  FileSystemElement,
  File,
} from 'src/app/models/file-system.model';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-document',
  templateUrl: './sidebar-document.component.html',
  styleUrls: ['./sidebar-document.component.scss'],
})
export class SidebarDocumentComponent implements OnInit {
  @ViewChild(TreeComponent) private tree: TreeComponent;

  fileSystem: FileSystem;
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [{ name: 'child1' }, { name: 'child2' }],
    },
    {
      name: 'root2',
      id: 2,
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [{ name: 'grandchild2.2.1' }] },
      ],
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null },
  ];

  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: (element, { parent, index }) => {
      return !!parent.children;
    },
  };

  constructor(
    private fileSystemService: FileSystemService,
    private fileApiService: FileApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getFileSystem();
  }

  getFileSystem(): void {
    this.fileSystemService.getFileSystem().subscribe((data) => {
      this.fileSystem = data;
    });
  }

  public addFile(): void {
    const file = new File(uuid.v4(), `Untitled`);
    this.fileSystem.fileSystemElements.push(file);
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
    this.fileApiService.createFile(file).subscribe();
  }

  public addFolder(): void {
    const folder = new Folder(uuid.v4(), `Untitled`);
    this.fileSystem.fileSystemElements.push(folder);
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
  }

  public deleteFile(file: File): void {
    this.fileSystem.fileSystemElements = this.removeElementFromFileSystem(
      this.fileSystem.fileSystemElements,
      file
    );
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
    this.fileApiService.deleteFile(file.id).subscribe();
  }

  public deleteFolder(folder: Folder): void {
    this.fileSystem.fileSystemElements = this.removeElementFromFileSystem(
      this.fileSystem.fileSystemElements,
      folder
    );
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
  }

  private removeElementFromFileSystem(
    fileSystemElements: FileSystemElement[],
    toRemoveElement: FileSystemElement
  ): FileSystemElement[] {
    let nextFileSystemElements = fileSystemElements.filter(
      (element) => element.id !== toRemoveElement.id
    );

    for (let fileSystemElement of nextFileSystemElements) {
      let fse = fileSystemElement as Folder;
      if (fse.children) {
        fse.children = this.removeElementFromFileSystem(
          fse.children,
          toRemoveElement
        );
      }
    }

    return nextFileSystemElements;
  }

  public onDrop(event: any) {
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
  }

  public nodeNameBlur() {
    this.fileSystemService.updateFileSystem(this.fileSystem, this.tree);
  }

  public navigateToFile(node: TreeNode) {
    if (node.data.children) {
      return;
    }
    this.router.navigate([`/workspace/files/${node.data.id}`])
  }
}
