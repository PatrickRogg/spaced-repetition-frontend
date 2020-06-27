import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeck } from 'src/app/models/flash-card-deck.model';
import { Topic } from 'src/app/models/topic.model';

@Component({
    selector: 'app-flash-card-deck-detail',
    templateUrl: './flash-card-deck-detail.component.html',
    styleUrls: ['./flash-card-deck-detail.component.scss']
})
export class FlashCardDeckDetailComponent implements OnInit {
    flashCardDeck: FlashCardDeck;

    constructor(
        private activatedRoute: ActivatedRoute,
        private flashCardDeckApiService: FlashCardDeckApiService,
    ) { }

    ngOnInit(): void {
        this.getFlashCardDeck();
    }

    getFlashCardDeck(): void {
        const flashCardDeckId = +this.activatedRoute.snapshot.paramMap.get('id');

        this.flashCardDeckApiService.getFlashCardDeckOfUser(flashCardDeckId).subscribe(
            data => {
                this.flashCardDeck = data;
            }
        );
    }

    public addTopic(topic: Topic): void {
        this.flashCardDeck.topics.push(topic);
    }

    public deleteTopic(topic: Topic): void {
        this.flashCardDeck.topics = this.flashCardDeck.topics.filter(t => t !== topic);
    }
}
