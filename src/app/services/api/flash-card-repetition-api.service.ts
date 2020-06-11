import { Injectable } from '@angular/core';
import { CORE_API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FlashCard, FlashCardBuilder } from 'src/app/shared/models/flash-card.model';

@Injectable({
    providedIn: 'root'
})
export class FlashCardRepetitionApiService {
    private header = { headers: { 'Content-Type': 'application/json' } };
    private FLASH_CARD_REPETITION_API_URL = CORE_API_URL + 'spaced-repetition'
    constructor(private httpClient: HttpClient) {
    }

    public getFlashCards(flashCardDeckIds: number[]): Observable<FlashCard[]> {
        return this.httpClient.post<FlashCard[]>(this.FLASH_CARD_REPETITION_API_URL, flashCardDeckIds, this.header);
    }
}
