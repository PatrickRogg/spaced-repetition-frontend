import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { FlashCard } from 'src/app/shared/models/flash-card.model';
import { NextRepetitionService } from 'src/app/services/next-repetition.service';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { FlashCardRepetitionApiService } from 'src/app/services/api/flash-card-repetition-api.service';
import { SpacedRepetition } from 'src/app/shared/models/spaced-repetition.model';

@Component({
    selector: 'app-spaced-repetition',
    templateUrl: './spaced-repetition.component.html',
    styleUrls: ['./spaced-repetition.component.scss']
})
export class SpacedRepetitionComponent implements OnInit {
    isQuestion = true;
    flashCardRepetitions: SpacedRepetition[] = [];
    todoFlashCards: FlashCard[] = []
    currentFLashCardIndex = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private flashCardRepetitionApiService: FlashCardRepetitionApiService,
        private flashCardApiService: FlashCardApiService,
        private nextRepetitionService: NextRepetitionService,
    ) {
        if (this.router.getCurrentNavigation().extras.state) {
            const flashCardDeckId = this.router.getCurrentNavigation().extras.state.flashCardDeckId;
            this.getFashCardDeck(flashCardDeckId);
        } else {
            this.router.navigate(['/home'])
        }
    }

    ngOnInit(): void {
    }

    getFashCardDeck(fashCardDeckId: any) {
        this.flashCardRepetitionApiService.getFlashCards([fashCardDeckId]).subscribe(
            (flashCards: FlashCard[]) => {
                flashCards.forEach(flashCard => this.flashCardRepetitions.push(new SpacedRepetition(flashCard)));
                this.todoFlashCards = flashCards;
            },            
        );
    }

    public showAnswer(): void {
        this.isQuestion = false;
    }

    public answerWrong(): void {
        this.completeFlashCard(1);
    }

    public answerCorrect(): void {
        this.completeFlashCard()
    }

    completeFlashCard(level?: number): void {
        const currFlashCard = this.todoFlashCards[this.currentFLashCardIndex];
        this.removeCurrentFlashCardFromTodo(currFlashCard.id);

        const currFLashCardRepetition = this.getFlashCardRepetitionBy(currFlashCard.id);
        currFLashCardRepetition.prevLevel = currFLashCardRepetition.flashCard.level;

        if (level) {
            currFLashCardRepetition.flashCard.level = level;
            currFLashCardRepetition.flashCard.lastWrongAnswer = new Date();
        } else {
            currFLashCardRepetition.flashCard.level++
        }

        currFLashCardRepetition.flashCard.nextRepetition = this.nextRepetitionService
            .getNextRepetition(currFLashCardRepetition.flashCard.lastWrongAnswer, currFLashCardRepetition.flashCard.level);

        this.flashCardApiService.updateFlashCard(currFlashCard.id, currFlashCard).subscribe();

        if (this.todoFlashCards.length === 0) {
            this.navigateToStatsPage();
        }

        this.isQuestion = true;
    }

    public navigateToStatsPage(): void {
        const navigationExtras: NavigationExtras = {
            state: {
                flashCardRepetitions: this.flashCardRepetitions
            },
            relativeTo: this.activatedRoute
        };
        this.router.navigate(['stats'], navigationExtras);
    }

    removeCurrentFlashCardFromTodo(flashCardId: number): void {
        this.todoFlashCards = this.todoFlashCards.filter((flashCard) => flashCard.id !== flashCardId);
    }

    getFlashCardRepetitionBy(flashCardId: number) {
        return this.flashCardRepetitions.find((flashCardRepetition) => flashCardRepetition.flashCard.id === flashCardId);
    }
}