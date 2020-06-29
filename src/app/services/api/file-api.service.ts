import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EDITOR_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { File } from 'src/app/models/file-system.model';

@Injectable({
  providedIn: 'root',
})
export class FileApiService {
  private header = { headers: { 'Content-Type': 'application/json' } };

  constructor(private httpClient: HttpClient) {}

  public getFile(fileId: string): Observable<File> {
    return this.httpClient.get<File>(`${EDITOR_API_URL}files/${fileId}`);
  }

  public createFile(file: File): Observable<File> {
    return this.httpClient.post<File>(`${EDITOR_API_URL}files/`, file, this.header);
  }

  public updateFile(file: File): Observable<File> {
    return this.httpClient.put<File>(`${EDITOR_API_URL}files/${file.id}`, file, this.header);
  }

  public deleteFile(fileId: string): Observable<any> {
    return this.httpClient.delete<any>(`${EDITOR_API_URL}files/${fileId}`);
  }
}
