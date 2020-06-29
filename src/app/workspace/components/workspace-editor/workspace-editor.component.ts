import { Component, OnInit } from '@angular/core';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { FlashCard } from 'src/app/models/flash-card.model';

@Component({
  selector: 'app-workspace-editor',
  templateUrl: './workspace-editor.component.html',
  styleUrls: ['./workspace-editor.component.scss'],
})
export class WorkspaceEditorComponent implements OnInit {
  flashCards: FlashCard[];

  constructor(private flashCardApiService: FlashCardApiService) {}

  ngOnInit(): void {
    this.getFlashCards();
  }

  getFlashCards(): void {
    this.flashCardApiService.getFlashCardsByIds([97, 101]).subscribe((data) => {
      this.flashCards = data;
    });
  }
}
