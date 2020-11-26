import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SpacedRepetitionFlashCard } from 'src/app/shared/models/flash-card.model';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { FlashCardRepetitionApiService } from 'src/app/services/api/flash-card-repetition-api.service';
import { SpacedRepetition } from 'src/app/shared/models/spaced-repetition.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditFlashCardComponent } from 'src/app/shared/components/edit-flash-card/edit-flash-card.component';
import * as dayjs from 'dayjs';
import { supermemo, SuperMemoGrade } from 'supermemo';

@Component({
  selector: 'app-spaced-repetition',
  templateUrl: './spaced-repetition.component.html',
  styleUrls: ['./spaced-repetition.component.scss'],
})
export class SpacedRepetitionComponent implements OnInit {
  isQuestion = true;
  flashCardRepetitions: SpacedRepetition[] = [];
  todoFlashCards: SpacedRepetitionFlashCard[] = [];
  currentFLashCardIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashCardRepetitionApiService: FlashCardRepetitionApiService,
    private flashCardApiService: FlashCardApiService,
    private modalService: NgbModal
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const flashCardDeckIds = this.router.getCurrentNavigation().extras.state
        .flashCardDeckIds;
      this.getFashCardDeck(flashCardDeckIds);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {}

  getFashCardDeck(fashCardDeckIds: number[]) {
    this.flashCardRepetitionApiService
      .getFlashCards(fashCardDeckIds)
      .subscribe((flashCards: SpacedRepetitionFlashCard[]) => {
        flashCards.forEach((flashCard) =>
          this.flashCardRepetitions.push(new SpacedRepetition(flashCard))
        );
        this.todoFlashCards = flashCards;
      });
  }

  public showAnswer(): void {
    this.isQuestion = false;
  }

  public gradeFlashCard(grade: SuperMemoGrade): void {
    const currFlashCard = this.todoFlashCards[this.currentFLashCardIndex];
    this.removeCurrentFlashCardFromTodo(currFlashCard.id);

    const currFLashCardRepetition = this.getFlashCardRepetitionBy(
      currFlashCard.id
    );
    const { interval, repetition, efactor } = supermemo(currFlashCard, grade);
    currFLashCardRepetition.flashCard.interval = interval;
    currFLashCardRepetition.flashCard.repetition = repetition;
    currFLashCardRepetition.flashCard.efactor = efactor;
    currFLashCardRepetition.flashCard.nextRepetition = dayjs(Date.now())
      .add(interval, 'day')
      .toISOString();

    this.flashCardApiService
      .updateFlashCard(currFlashCard.id, currFlashCard)
      .subscribe();

    if (this.todoFlashCards.length === 0) {
      this.navigateToStatsPage();
    }

    this.isQuestion = true;
  }

  public navigateToStatsPage(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        flashCardRepetitions: this.flashCardRepetitions,
      },
      relativeTo: this.activatedRoute,
    };
    this.router.navigate(['stats'], navigationExtras);
  }

  removeCurrentFlashCardFromTodo(flashCardId: number): void {
    this.todoFlashCards = this.todoFlashCards.filter(
      (flashCard) => flashCard.id !== flashCardId
    );
  }

  getFlashCardRepetitionBy(flashCardId: number) {
    return this.flashCardRepetitions.find(
      (flashCardRepetition) => flashCardRepetition.flashCard.id === flashCardId
    );
  }

  public deleteFlashCard(flashCard: SpacedRepetitionFlashCard): void {
    this.todoFlashCards = this.todoFlashCards.filter((fc) => fc !== flashCard);
    this.flashCardRepetitions = this.flashCardRepetitions.filter(
      (fcr) => fcr.flashCard.id !== flashCard.id
    );
    this.flashCardApiService.deleteFlashCard(flashCard.id).subscribe();
    this.isQuestion = true;

    if (this.todoFlashCards.length === 0) {
      this.navigateToStatsPage();
    }
  }

  public async openEditFlashCardModal(flashCard: SpacedRepetitionFlashCard) {
    const options = {
      centered: true,
      size: `xl`,
    };

    const modalRef = this.modalService.open(EditFlashCardComponent, options);
    modalRef.componentInstance.flashCardId = flashCard.id;
    modalRef.result.then((flashCard) => this.updateFlashCard(flashCard));
  }

  public updateFlashCard(updatedFlashCard: SpacedRepetitionFlashCard): void {
    for (let i = 0; i < this.todoFlashCards.length; i++) {
      if (this.todoFlashCards[i].id === updatedFlashCard.id) {
        this.todoFlashCards[i] = updatedFlashCard;
      }
    }
  }
}
