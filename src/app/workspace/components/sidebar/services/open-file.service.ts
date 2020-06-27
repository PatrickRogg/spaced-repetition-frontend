import { Injectable } from '@angular/core';
import { File } from 'src/app/models/file-system.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OpenFileService {
  private openedFile = null;

  constructor() {}

  public setOpenFile(file: File) {
    this.openedFile = file;
  }

  public isOpen(file: File) {
    return this.openedFile === file;
  }
}
