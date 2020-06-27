import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/models/file-system.model';

@Component({
  selector: 'app-sidebar-folder',
  templateUrl: './sidebar-folder.component.html',
  styleUrls: ['./sidebar-folder.component.scss']
})
export class SidebarFolderComponent implements OnInit {
  @Input() folder: Folder;
  isOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

}
