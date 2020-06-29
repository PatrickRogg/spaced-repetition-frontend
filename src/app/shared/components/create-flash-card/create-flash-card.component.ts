import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FlashCard } from 'src/app/models/flash-card.model';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { CreateFlashCardRequest } from 'src/app/models/create-flash-card-request.model';
import { FlashCardDeck } from 'src/app/models/flash-card-deck.model';
import { Topic } from 'src/app/models/topic.model';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FlashCardDeckOverview } from 'src/app/models/flash-card-deck-overview.model';
import { FlashCardDeckWithTopic } from 'src/app/models/flash-card-deck-with-topic.model';

@Component({
  selector: 'app-create-flash-card',
  templateUrl: './create-flash-card.component.html',
  styleUrls: ['./create-flash-card.component.scss'],
})
export class CreateFlashCardComponent implements OnInit {
  @Output() newFlashCardCreatedEmitter = new EventEmitter<FlashCard>();

  flashCardForm: FormGroup;
  validationErrors = new ErrorResponse({});
  flashCardDecks: FlashCardDeckWithTopic[];
  selectedFlashCardDeck: FlashCardDeckWithTopic = null;
  selectedTopic: Topic = null;


  constructor(
    private flashCardApiService: FlashCardApiService,
    private flashCardDeckApiService: FlashCardDeckApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createFlashCardForm();
    this.getFlashCardDecks();
  }

  getFlashCardDecks(): void {
    this.flashCardDeckApiService
      .getFlashCardDecksOfUserWithTopics()
      .subscribe((data) => (this.flashCardDecks = data));
  }

  createFlashCardForm(): void {
    this.flashCardForm = this.fb.group({
      question: [''],
      answer: [''],
    });
  }

  public submit(): void {
    this.createFlashCard();
  }

  createFlashCard(): void {
    if (!this.selectedTopic) {
      return;
    }

    const form = this.flashCardForm;
    const data = new CreateFlashCardRequest(
      form.get('question').value,
      form.get('answer').value,
      this.selectedTopic.id
    );

    this.flashCardApiService.createFlashCard(data).subscribe(
      (flashCard) => {
        this.newFlashCardCreatedEmitter.emit(flashCard);
      },
      (error) => (this.validationErrors = error.error.errors)
    );
  }
}
