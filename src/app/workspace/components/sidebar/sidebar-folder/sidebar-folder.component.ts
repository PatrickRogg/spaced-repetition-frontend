import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from 'src/app/models/file-system.model';

@Component({
  selector: 'app-sidebar-folder',
  templateUrl: './sidebar-folder.component.html',
  styleUrls: ['./sidebar-folder.component.scss']
})
export class SidebarFolderComponent implements OnInit {
  @Input() folder: Folder;
  @Output() folderDeletedEmitter = new EventEmitter<Folder>();

  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  public deleteFolder(): void {
    this.folderDeletedEmitter.emit(this.folder);
  }

  public isFolderEmpty(): boolean {
    return this.folder.children.length === 0;
  }
}
