import { Component, OnInit } from '@angular/core';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeckOverview } from 'src/app/shared/models/flash-card-deck-overview.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flashCardDecks: FlashCardDeckOverview[] = [];

  constructor(private flashCardDeckApiService: FlashCardDeckApiService) {}

  ngOnInit(): void {
    this.getFlashCardDecks();
  }

  getFlashCardDecks(): void {
    this.flashCardDeckApiService.getFlashCardDecksOfUser().subscribe((data) => {
      this.flashCardDecks = data;
    });
  }
}
