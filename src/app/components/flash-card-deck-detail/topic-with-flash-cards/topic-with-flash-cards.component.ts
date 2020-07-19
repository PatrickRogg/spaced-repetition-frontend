import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic.model';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { FlashCard } from 'src/app/shared/models/flash-card.model';
import { TopicApiService } from 'src/app/services/api/topic-api.service';
import { CreateUpdateTopic } from 'src/app/shared/models/create-update-topic.model';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-topic-with-flash-cards',
  templateUrl: './topic-with-flash-cards.component.html',
  styleUrls: ['./topic-with-flash-cards.component.scss'],
})
export class TopicWithFlashCardsComponent implements OnInit {
  @Input() topic: Topic;

  @Output() deleteTopicEventEmitter = new EventEmitter<Topic>();

  isEditingTopic = false;
  validationError = new ErrorResponse({});
  topicForm: FormGroup;
  flashCards: FlashCard[] = [];

  constructor(
    private topicApiService: TopicApiService,
    private fb: FormBuilder,
    private flashCardApiService: FlashCardApiService
  ) {}

  ngOnInit(): void {
    this.getFlashCards();
  }

  public editTopic(): void {
    this.createTopicForm();
    this.isEditingTopic = true;
  }

  createTopicForm(): void {
    this.topicForm = this.fb.group({
      name: new FormControl(this.topic.name),
    });
  }

  getFlashCards(): void {
    this.flashCardApiService
      .getAllFlashCardsByTopicId(this.topic.id)
      .subscribe((data) => {
        this.flashCards = data;
      });
  }

  public updateTopic(): void {
    const name = this.topicForm.get(`name`).value;

    if (name === this.topic.name) {
      this.isEditingTopic = false;
      this.validationError = new ErrorResponse({});
      return;
    }

    const topicData = new CreateUpdateTopic();
    topicData.flashCardDeckId = this.topic.flashCardDeckId;
    topicData.name = name;

    this.topicApiService.update(this.topic.id, topicData).subscribe(
      (data) => {
        this.topic = data;
        this.isEditingTopic = false;
        this.validationError = new ErrorResponse({});
      },
      (error) => {
        if (error.error) {
          this.validationError = error.error.errors;
        }
      }
    );
  }

  public deleteTopic(): void {
    this.deleteTopicEventEmitter.emit(this.topic);
    this.topicApiService.delete(this.topic.id).subscribe();
  }

  public deleteFlashCard(flashCard: FlashCard): void {
    this.flashCards = this.flashCards.filter((fc) => fc !== flashCard);
    this.flashCardApiService.deleteFlashCard(flashCard.id).subscribe();
  }
}
