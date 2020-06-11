import { Component, OnInit, Input } from '@angular/core';
import { FlashCardDeck } from 'src/app/shared/models/flash-card-deck.model';
import { FlashCardDeckApiService } from 'src/app/services/api/flash-card-deck-api.service';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-flash-card-deck-detail-title',
    templateUrl: './flash-card-deck-detail-title.component.html',
    styleUrls: ['./flash-card-deck-detail-title.component.scss']
})
export class FlashCardDeckDetailTitleComponent implements OnInit {
    @Input() flashCardDeck: FlashCardDeck;

    isEditing = false;
    validationErrors = new ErrorResponse({});
    flashCardDeckForm: FormGroup;

    constructor(
        private flashCardDeckApiService: FlashCardDeckApiService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.createFlashCardDeckForm();
    }

    public edit(): void {
        this.isEditing = true;
    }

    createFlashCardDeckForm(): void {
        this.flashCardDeckForm = this.fb.group({
            name: [this.flashCardDeck.name],
            notes: [this.flashCardDeck.notes]
        });
    }

    public update(): void {
        if (!this.isEditing) {
            return;
        }

        this.flashCardDeck.name = this.flashCardDeckForm.get('name').value;
        this.flashCardDeck.notes = this.flashCardDeckForm.get('notes').value;

        this.flashCardDeckApiService.updateFlashCardDeck(this.flashCardDeck.id, this.flashCardDeck).subscribe(
            data => {
                this.isEditing = false;
            },
            error => {
                if (error.error) {
                    this.validationErrors = error.error.errors;
                }
            }
        );
    }
}
