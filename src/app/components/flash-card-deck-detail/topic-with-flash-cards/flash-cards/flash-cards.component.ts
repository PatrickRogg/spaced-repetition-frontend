import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFlashCardComponent } from './create-flash-card/create-flash-card.component';
import { EditFlashCardComponent } from 'src/app/shared/components/edit-flash-card/edit-flash-card.component';
import { FlashCard } from 'src/app/models/flash-card.model';

@Component({
    selector: 'app-flash-cards',
    templateUrl: './flash-cards.component.html',
    styleUrls: ['./flash-cards.component.scss']
})
export class FlashCardsComponent implements OnInit {
    @Input() topicId: number;
    @Input() flashCards: FlashCard[];

    @Output() deleteFlashCardEventEmitter = new EventEmitter<FlashCard>();
    
    constructor(
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
    }

    public async openCreateFlashCardModal() {
        const options = {
            centered: true,
            size: `xl`
        }
        const modalRef = this.modalService.open(CreateFlashCardComponent, options);
        modalRef.componentInstance.topicId = this.topicId;

        modalRef.result.then((createdFlashCard) => {
            this.flashCards.push(createdFlashCard);
        });
    }

    public async openEditFlashCardModal(flashCard: FlashCard) {
        const options = {
            centered: true,
            size: `xl`
        }

        const modalRef = this.modalService.open(EditFlashCardComponent, options);
        modalRef.componentInstance.flashCardId = flashCard.id;

        modalRef.result.then(flashCard => this.updateFlashCard(flashCard));
    }

    public updateFlashCard(updatedFlashCard: FlashCard): void {
        for (let i = 0; i < this.flashCards.length; i++) {
            if (this.flashCards[i].id === updatedFlashCard.id) {
                this.flashCards[i] = updatedFlashCard;
            }
        }
    }

    public deleteFlashCard(flashCard: FlashCard):void {
        this.deleteFlashCardEventEmitter.emit(flashCard);
    }
}
