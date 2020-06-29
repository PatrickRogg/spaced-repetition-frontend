import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileSystem } from 'src/app/models/file-system.model';
import { EDITOR_API_URL } from 'src/app/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileSystemApiService {
  private header = { headers: { 'Content-Type': 'application/json' } };

  constructor(private httpClient: HttpClient) {}

  public get(): Observable<FileSystem> {
    return this.httpClient
      .get<any>(`${EDITOR_API_URL}file-systems`)
      .pipe(map((data) => data.fileSystem));
  }

  public update(fileSystem: FileSystem): Observable<FileSystem> {
    const body = {
      fileSystem: fileSystem,
    };

    return this.httpClient.put<any>(
      `${EDITOR_API_URL}file-systems`,
      body,
      this.header
    );
  }
}
