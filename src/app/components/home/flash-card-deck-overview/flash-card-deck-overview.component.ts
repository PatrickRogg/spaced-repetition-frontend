import { Component, OnInit, Input } from '@angular/core';
import { FlashCardDeck } from 'src/app/shared/models/flash-card-deck.model';
import { Router, NavigationExtras } from '@angular/router';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFlashCardDeckComponent } from './create-flash-card-deck/create-flash-card-deck.component';
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
        private modalService: NgbModal,
        private flashCardDeckApiService: FlashCardDeckApiService,
    ) { }

    ngOnInit(): void {
    }
    
    public openCreateFlashCardDeckModal(): void {
        const options = {
            centered: true,
            size: `xl`
        }
        const modalRef = this.modalService.open(CreateFlashCardDeckComponent, options);

        modalRef.result.then((createdFlashCardDeck) => {
            this.flashCardDecks.push(createdFlashCardDeck);
        });
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
