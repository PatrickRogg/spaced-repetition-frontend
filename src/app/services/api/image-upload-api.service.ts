import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from 'src/app/components/rich-text-editor/image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadApiService {
  private CLIENT_ID = `b874cc631c8075c`;
  private header = {
    headers: {
      Authorization: `Client-ID ${this.CLIENT_ID}`,
      'Content-Type': 'application/json',
    },
  };
  private API_URL = `https://api.imgur.com/3/image`;

  constructor(private httpClient: HttpClient) {}

  public uploadImage(image: any): Observable<Image> {
    const data = {
      image: image,
      type: `base64`,
    };
    return this.httpClient.post<Image>(this.API_URL, data, this.header);
  }
}
