import { Component, OnInit, Input } from '@angular/core';
import { File } from 'src/app/models/file-system.model';
import { OpenFileService } from '../services/open-file.service';

@Component({
  selector: 'app-sidebar-file',
  templateUrl: './sidebar-file.component.html',
  styleUrls: ['./sidebar-file.component.scss'],
})
export class SidebarFileComponent implements OnInit {
  @Input() file: File;

  constructor(private openFileService: OpenFileService) {}

  ngOnInit(): void {}

  public openFile(): void {
    this.openFileService.setOpenFile(this.file);
  }

  public isOpen(): boolean {
    return this.openFileService.isOpen(this.file);
  }
}
