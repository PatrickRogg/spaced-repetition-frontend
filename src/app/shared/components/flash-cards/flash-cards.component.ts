import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashCard } from 'src/app/models/flash-card.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditFlashCardComponent } from '../edit-flash-card/edit-flash-card.component';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss'],
})
export class FlashCardsComponent implements OnInit {
  @Input() flashCards: FlashCard[];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  public async openEditFlashCardModal(flashCard: FlashCard) {
    const options = {
      centered: true,
      size: `xl`,
    };

    const modalRef = this.modalService.open(EditFlashCardComponent, options);
    modalRef.componentInstance.flashCardId = flashCard.id;

    modalRef.result.then((flashCard) => this.updateFlashCard(flashCard));
  }

  public updateFlashCard(updatedFlashCard: FlashCard): void {
    for (let i = 0; i < this.flashCards.length; i++) {
      if (this.flashCards[i].id === updatedFlashCard.id) {
        this.flashCards[i] = updatedFlashCard;
      }
    }
  }

  public deleteFlashCard(flashCard: FlashCard): void {
    this.flashCards = this.flashCards.filter((fc) => fc.id !== flashCard.id);
  }
}
