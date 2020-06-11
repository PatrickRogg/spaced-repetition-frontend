import { Injectable } from '@angular/core';
import { CORE_API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Topic } from 'src/app/shared/models/topic.model';
import { Observable } from 'rxjs';
import { CreateUpdateTopic } from 'src/app/shared/models/create-update-topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicApiService {
  private header = { headers: { 'Content-Type': 'application/json' } };
  private TOPIC_API_URL = CORE_API_URL + 'topics/';

  constructor(private httpClient: HttpClient) {
  }

  public create(data: CreateUpdateTopic): Observable<Topic> {
      return this.httpClient.post<Topic>(this.TOPIC_API_URL, data, this.header);
  }

  public update(topicId: number, data: CreateUpdateTopic): Observable<Topic> {
      return this.httpClient.put<Topic>(this.TOPIC_API_URL + topicId, data, this.header);
  }

  public delete(topicId: number) {
      return this.httpClient.delete(this.TOPIC_API_URL + topicId);
  }
}
