import { Injectable } from '@angular/core';
import { FileSystem } from 'src/app/models/file-system.model';
import { BehaviorSubject } from 'rxjs';
import { FileSystemApiService } from 'src/app/services/api/file-system-api.service';

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

  public updateFileSystem(fileSystem: FileSystem): void {
    this.fileSystem.next(fileSystem);
    this.fileSystemApiService.update(fileSystem).subscribe();
  }
}
