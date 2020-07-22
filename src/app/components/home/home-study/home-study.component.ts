import { Component, OnInit, Input } from '@angular/core';
import { FlashCardDeckOverview } from 'src/app/shared/models/flash-card-deck-overview.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-study',
  templateUrl: './home-study.component.html',
  styleUrls: ['./home-study.component.scss'],
})
export class HomeStudyComponent implements OnInit {
  @Input() flashCardDecks: FlashCardDeckOverview[];
  todoFlashCardCount: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public getTodoFlashCardCount(): number {
    if (this.todoFlashCardCount) {
      return this.todoFlashCardCount;
    }

    let count = 0;

    this.flashCardDecks.forEach((flashCardDeck) => {
      count += flashCardDeck.todoFlashCards;
    });

    this.todoFlashCardCount = count;
    return count;
  }

  public startRepetition(): void {
    const flashCardDeckIds = [];

    this.flashCardDecks
      .filter((flashCardDeck) => flashCardDeck.todoFlashCards > 0)
      .forEach((flashCardDeck) => flashCardDeckIds.push(flashCardDeck.id));

    const navigationExtras: NavigationExtras = {
      state: {
        flashCardDeckIds: flashCardDeckIds,
      },
    };
    this.router.navigate(['/spaced-repetition'], navigationExtras);
  }
}
