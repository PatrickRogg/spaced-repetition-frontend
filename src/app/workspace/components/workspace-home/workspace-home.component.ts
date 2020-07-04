import { Component, OnInit } from '@angular/core';
import { FlashCardDeckOverview } from 'src/app/models/flash-card-deck-overview.model';
import { Router, NavigationExtras } from '@angular/router';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeck } from 'src/app/models/flash-card-deck.model';

@Component({
  selector: 'app-workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.scss'],
})
export class WorkspaceHomeComponent implements OnInit {
  flashCardDecks: FlashCardDeckOverview[] = [];

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
    });
  }

  public create(): void {
    const flashCardDeck = new FlashCardDeck(`Untitled`, ``);

    this.flashCardDeckApiService
      .createFlashCardDeck(flashCardDeck)
      .subscribe((data) => {
        this.navigateToDetail(data.id);
      });
  }

  public navigateToDetail(flashCardDeckId: number): void {
    this.router.navigate([`/flash-card-decks`, flashCardDeckId]);
  }

  public start(flashCardDeck: FlashCardDeck): void {
    const navigationExtras: NavigationExtras = {
      state: {
        flashCardDeckIds: [flashCardDeck.id],
      },
    };
    this.router.navigate(['/spaced-repetition'], navigationExtras);
  }

  public deleteFlashCardDeck(flashCardDeck: FlashCardDeckOverview): void {
    this.flashCardDecks = this.flashCardDecks.filter(
      (fd) => flashCardDeck !== fd
    );
    this.flashCardDeckApiService
      .deleteFlashCardDeck(flashCardDeck.id)
      .subscribe();
  }
}
