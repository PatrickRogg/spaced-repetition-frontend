import { Component, OnInit } from '@angular/core';
import { FlashCardDeck } from 'src/app/shared/models/flash-card-deck.model';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-flash-card-deck',
    templateUrl: './create-flash-card-deck.component.html',
    styleUrls: ['./create-flash-card-deck.component.scss']
})
export class CreateFlashCardDeckComponent implements OnInit {

    flashCardDeck: FlashCardDeck = new FlashCardDeck(``, ``);
    flashCardDeckForm: FormGroup;
    validationErrors = new ErrorResponse({});

    constructor(
        private fb: FormBuilder,
        private flashCardDeckApiService: FlashCardDeckApiService,
        private activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {
        this.createFlashCardDeckForm();
    }

    createFlashCardDeckForm(): void {
        this.flashCardDeckForm = this.fb.group({
            name: [this.flashCardDeck.name],
            notes: [this.flashCardDeck.notes],
        });
    }

    public close(): void {
        this.activeModal.dismiss();
    }

    public save(): void {
        if (this.flashCardDeckForm.invalid) {
            return;
        }

        const form = this.flashCardDeckForm;
        this.flashCardDeck.name = form.get('name').value;
        this.flashCardDeck.notes = form.get('notes').value;
        this.create();
    }

    public create(): void {
        this.flashCardDeckApiService.createFlashCardDeck(this.flashCardDeck).subscribe(
            data => {
                this.activeModal.close(data);
            },
            error => this.validationErrors = error.error.errors
        );

    }
}
