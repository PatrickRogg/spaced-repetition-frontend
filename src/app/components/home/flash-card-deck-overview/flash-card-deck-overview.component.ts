import { Component, OnInit, Input } from '@angular/core';
import { FlashCardDeck } from 'src/app/shared/models/flash-card-deck.model';
import { Router, NavigationExtras } from '@angular/router';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeckOverview } from 'src/app/shared/models/flash-card-deck-overview.model';

@Component({
    selector: 'app-flash-card-deck-overview',
    templateUrl: './flash-card-deck-overview.component.html',
    styleUrls: ['./flash-card-deck-overview.component.scss']
})
export class FlashCardDeckOverviewComponent implements OnInit {
    @Input() flashCardDecks: FlashCardDeckOverview[] = [];

    constructor(
        private router: Router,
        private flashCardDeckApiService: FlashCardDeckApiService,
    ) { }

    ngOnInit(): void {
    }

    public create(): void {
        const flashCardDeck = new FlashCardDeck(`Untitled`, ``);

        this.flashCardDeckApiService.createFlashCardDeck(flashCardDeck).subscribe(
            data => {
                this.navigateToDetail(data.id);
            }
        );
    }

    public navigateToDetail(flashCardDeckId: number): void {
        this.router.navigate([`/flash-card-decks`, flashCardDeckId]);
    }

    public start(flashCardDeck: FlashCardDeck): void {
        const navigationExtras: NavigationExtras = {
            state: {
                flashCardDeckIds: [flashCardDeck.id]
            }
        };
        this.router.navigate(['/spaced-repetition'], navigationExtras);
    }

    public deleteFlashCardDeck(flashCardDeck: FlashCardDeckOverview): void {
        this.flashCardDecks = this.flashCardDecks.filter(fd => flashCardDeck !== fd);
        this.flashCardDeckApiService.deleteFlashCardDeck(flashCardDeck.id).subscribe();
    }
}
