import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { FlashCard } from 'src/app/shared/models/flash-card.model';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { UpdateFlashCard } from 'src/app/shared/models/update-flash-card.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { supermemo } from 'supermemo';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-edit-flash-card',
  templateUrl: './edit-flash-card.component.html',
  styleUrls: ['./edit-flash-card.component.scss'],
})
export class EditFlashCardComponent implements OnInit {
  flashCardForm: FormGroup;
  @Input() flashCardId: number;
  validationErrors = new ErrorResponse({});

  constructor(
    private flashCardApiService: FlashCardApiService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getFlashCard();
  }

  getFlashCard(): void {
    this.flashCardApiService
      .getFlashCard(this.flashCardId)
      .subscribe((data) => {
        this.createFlashCardForm(data);
      });
  }

  createFlashCardForm(flashCard: FlashCard): void {
    this.flashCardForm = this.fb.group({
      question: [flashCard.question],
      answer: [flashCard.answer],
      interval: [flashCard.interval],
      repetition: [flashCard.repetition],
      efactor: [flashCard.efactor],
    });
  }

  public submit(): void {
    const form = this.flashCardForm;

    const requestData = new UpdateFlashCard(
      form.get('question').value,
      form.get('answer').value,
      form.get('interval').value,
      form.get('repetition').value,
      form.get('efactor').value,
      this.getNextDate().toISOString()
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
    const { interval, repetition, efactor } = supermemo(
      {
        efactor: +this.flashCardForm.get('efactor'),
        interval: +this.flashCardForm.get('interval'),
        repetition: +this.flashCardForm.get('repetition'),
      },
      3
    );
    if (!this.flashCardForm.get('interval').value) {
      return new Date();
    }

    const now = new Date()
    now.setDate(new Date().getDate() + +this.flashCardForm.get('interval').value);
    return now;
  }

  public close(): void {
    this.activeModal.dismiss();
  }
}
