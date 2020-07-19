import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { FlashCard } from 'src/app/shared/models/flash-card.model';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { NextRepetitionService } from 'src/app/services/next-repetition.service';
import { formatDate } from '@angular/common';
import { LEVELS } from 'src/app/app.constants';
import { UpdateFlashCard } from 'src/app/shared/models/update-flash-card.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateConverterService } from 'src/app/services/date-converter.service';

@Component({
  selector: 'app-edit-flash-card',
  templateUrl: './edit-flash-card.component.html',
  styleUrls: ['./edit-flash-card.component.scss'],
})
export class EditFlashCardComponent implements OnInit {
  flashCardForm: FormGroup;
  @Input() flashCardId: number;
  validationErrors = new ErrorResponse({});
  levels = LEVELS;

  constructor(
    private flashCardApiService: FlashCardApiService,
    private fb: FormBuilder,
    private nextRepetitionService: NextRepetitionService,
    private activeModal: NgbActiveModal,
    private dateConverterService: DateConverterService
  ) {}

  ngOnInit(): void {
    this.getFlashCard();
  }

  getFlashCard(): void {
    this.flashCardApiService
      .getFlashCard(this.flashCardId)
      .subscribe((data) => this.createFlashCardForm(data));
  }

  createFlashCardForm(flashCard: FlashCard): void {
    const formattedDate = formatDate(
      flashCard.lastWrongAnswer,
      'yyyy-MM-dd',
      'en'
    );

    this.flashCardForm = this.fb.group({
      question: [flashCard.question],
      answer: [flashCard.answer],
      level: [flashCard.level],
      lastWrongAnswer: [formattedDate],
    });
  }

  public submit(): void {
    const form = this.flashCardForm;
    const lastWrongAnswerAsString: string = form.get('lastWrongAnswer').value;
    const lastWrongAnswer = this.dateConverterService.convertToUTC(
      new Date(lastWrongAnswerAsString)
    );

    const requestData = new UpdateFlashCard(
      form.get('question').value,
      form.get('answer').value,
      form.get('level').value,
      lastWrongAnswer
    );

    this.flashCardApiService
      .updateFlashCard(this.flashCardId, requestData)
      .subscribe(
        (data) => {
          this.activeModal.close(data);
        },
        (error) => {
          if (error.error) {
            this.validationErrors = error.error.errors;
          }
        }
      );
  }

  public getNextDate(): Date {
    return this.nextRepetitionService.getNextRepetition(
      new Date(this.flashCardForm.get('lastWrongAnswer').value),
      this.flashCardForm.get('level').value
    );
  }

  public close(): void {
    this.activeModal.dismiss();
  }
}
