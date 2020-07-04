import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeckOverview } from 'src/app/models/flash-card-deck-overview.model';

@Component({
  selector: 'app-sidebar-repetition',
  templateUrl: './sidebar-repetition.component.html',
  styleUrls: ['./sidebar-repetition.component.scss'],
})
export class SidebarRepetitionComponent implements OnInit {
  flashCardDecks: FlashCardDeckOverview[];
  todoFlashCardCount: number;

  constructor(
    private router: Router,
    private flashCardDeckApiService: FlashCardDeckApiService
  ) {}

  ngOnInit(): void {
    this.getFlashCardDecks();
  }

  getFlashCardDecks(): void {
    this.flashCardDeckApiService.getFlashCardDecksOfUser().subscribe((data) => {
      this.flashCardDecks = data;
      this.todoFlashCardCount = this.getTodoFlashCardCount();
    });
  }

  getTodoFlashCardCount(): number {
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

  public showDecks(): void {
  }
}
