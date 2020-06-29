import { Injectable } from '@angular/core';
import { CORE_API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlashCard } from 'src/app/models/flash-card.model';
import { CreateFlashCardRequest } from 'src/app/models/create-flash-card-request.model';
import { UpdateFlashCard } from 'src/app/models/update-flash-card.model';

@Injectable({
    providedIn: 'root'
})
export class FlashCardApiService {
    
    private header = { headers: { 'Content-Type': 'application/json' } };
    private FLASH_CARD_API_URL = CORE_API_URL + 'flash-cards/';

    constructor(private httpClient: HttpClient) {
    }

    public getAllFlashCardsByTopicId(topicId: number): Observable<FlashCard[]> {
        return this.httpClient.get<FlashCard[]>(this.FLASH_CARD_API_URL + `user/topic/${topicId}`);
    }

    public getFlashCard(flashCardId: number): Observable<FlashCard> {
        return this.httpClient.get<FlashCard>(this.FLASH_CARD_API_URL + `user/${flashCardId}`);
    }

    public createFlashCard(data: CreateFlashCardRequest): Observable<FlashCard> {
        return this.httpClient.post<FlashCard>(this.FLASH_CARD_API_URL, data, this.header);
    }

    public updateFlashCard(flashCardId: number, data: UpdateFlashCard): Observable<FlashCard> {
        return this.httpClient.put<FlashCard>(this.FLASH_CARD_API_URL + flashCardId, data, this.header);
    }

    public deleteFlashCard(flashCardId: number) {
        return this.httpClient.delete(this.FLASH_CARD_API_URL + flashCardId);
    }

    public getFlashCardsByIds(ids: number[]) {
        return this.httpClient.post<FlashCard[]>(this.FLASH_CARD_API_URL + `user/`, ids);
      }
}
