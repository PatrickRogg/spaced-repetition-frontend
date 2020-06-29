import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashCard } from 'src/app/models/flash-card.model';
import { EditFlashCardComponent } from 'src/app/shared/components/edit-flash-card/edit-flash-card.component';

@Component({
  selector: 'app-workspace-editor-flashcards',
  templateUrl: './workspace-editor-flashcards.component.html',
  styleUrls: ['./workspace-editor-flashcards.component.scss'],
})
export class WorkspaceEditorFlashcardsComponent implements OnInit {
  @Input() flashCards: FlashCard[];
  @Output() deleteFlashCardEventEmitter = new EventEmitter<FlashCard>();

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
    this.deleteFlashCardEventEmitter.emit(flashCard);
  }
}
