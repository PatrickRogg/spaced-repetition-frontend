import { Component, OnInit } from '@angular/core';
import { FileSystem, File, Folder } from 'src/app/models/file-system.model';
import { FileSystemApiService } from 'src/app/services/api/file-system-api.service';
import { FileApiService } from 'src/app/services/api/file-api.service';
import { FileSystemService } from '../../services/file-system.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  fileSystem: FileSystem;

  constructor(
    private fileSystemService: FileSystemService,
    private fileApiService: FileApiService
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
    this.fileSystemService.updateFileSystem(this.fileSystem);
    this.fileApiService.createFile(file).subscribe();
  }

  public addFolder(): void {
    const folder = new Folder(uuid.v4(), `Untitled`);
    this.fileSystem.fileSystemElements.push(folder);
    this.fileSystemService.updateFileSystem(this.fileSystem);
  }

  public deleteFile(file: File): void {
    this.fileSystem.fileSystemElements = this.fileSystem.fileSystemElements.filter(
      (e) => e !== file
    );
    this.fileSystemService.updateFileSystem(this.fileSystem);
    this.fileApiService.deleteFile(file.id).subscribe();
  }

  public deleteFolder(folder: Folder): void {
    this.fileSystem.fileSystemElements = this.fileSystem.fileSystemElements.filter(
      (e) => e !== folder
    );
    this.fileSystemService.updateFileSystem(this.fileSystem);
  }
}
