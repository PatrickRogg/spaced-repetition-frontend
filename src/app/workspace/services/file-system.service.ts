import { Injectable } from '@angular/core';
import { FileSystem } from 'src/app/models/file-system.model';
import { BehaviorSubject } from 'rxjs';
import { FileSystemApiService } from 'src/app/services/api/file-system-api.service';
import { TreeComponent } from 'angular-tree-component';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  public fileSystem = new BehaviorSubject<FileSystem>(null);

  constructor(private fileSystemApiService: FileSystemApiService) {}

  getFileSystem(): BehaviorSubject<FileSystem> {
    this.fileSystemApiService
      .get()
      .subscribe((data) => this.fileSystem.next(data));
    return this.fileSystem;
  }

  public updateFileSystem(fileSystem: FileSystem, treeComponent: TreeComponent): void {
    treeComponent.treeModel.update();
    this.fileSystem.next(fileSystem);
    this.fileSystemApiService.update(fileSystem).subscribe();
  }
}
