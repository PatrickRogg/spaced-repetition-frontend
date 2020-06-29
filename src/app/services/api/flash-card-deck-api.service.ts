import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CORE_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { FlashCardDeckOverview } from 'src/app/models/flash-card-deck-overview.model';
import { FlashCardDeck } from 'src/app/models/flash-card-deck.model';
import { FlashCardDeckWithTopic } from 'src/app/models/flash-card-deck-with-topic.model';

@Injectable({
    providedIn: 'root'
})
export class FlashCardDeckApiService {
    private header = { headers: { 'Content-Type': 'application/json' } };
    private FLASH_CARD_API_URL = CORE_API_URL + 'flash-card-decks/'

    constructor(private httpClient: HttpClient) {
    }

    public getFlashCardDecksOfUser(): Observable<FlashCardDeckOverview[]> {
        return this.httpClient.get<FlashCardDeckOverview[]>(this.FLASH_CARD_API_URL + 'user/overview');
    } 

    public getFlashCardDeckOfUser(id: number): Observable<FlashCardDeck> {
        return this.httpClient.get<FlashCardDeck>(this.FLASH_CARD_API_URL + `user/${id}`);
    } 

    public createFlashCardDeck(flashCardDeck: FlashCardDeck): Observable<FlashCardDeckOverview> {
        return this.httpClient.post<FlashCardDeckOverview>(this.FLASH_CARD_API_URL, flashCardDeck, this.header);
    }

    public updateFlashCardDeck(id: number, flashCardDeck: FlashCardDeck) {
        return this.httpClient.put(this.FLASH_CARD_API_URL + id, flashCardDeck, this.header);
    }

    public deleteFlashCardDeck(id: number) {
        return this.httpClient.delete(this.FLASH_CARD_API_URL + id);
    }

    public getFlashCardDecksOfUserWithTopics(): Observable<FlashCardDeckWithTopic[]> {
        return this.httpClient.get<FlashCardDeckWithTopic[]>(this.FLASH_CARD_API_URL + 'user/with-topics');
    } 
}
