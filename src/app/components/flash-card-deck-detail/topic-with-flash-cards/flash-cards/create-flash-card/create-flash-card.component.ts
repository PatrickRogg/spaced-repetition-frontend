import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlashCardApiService } from 'src/app/services/api/flash-card-api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { FlashCard } from 'src/app/models/flash-card.model';
import { CreateFlashCardRequest } from 'src/app/models/create-flash-card-request.model';

@Component({
    selector: 'app-create-flash-card',
    templateUrl: './create-flash-card.component.html',
    styleUrls: ['./create-flash-card.component.scss']
})
export class CreateFlashCardComponent implements OnInit {
    @Input() topicId: number;

    @Output() newFlashCardCreatedEmitter = new EventEmitter<FlashCard>();

    flashCardForm: FormGroup;
    validationErrors = new ErrorResponse({});

    constructor(
        private flashCardApiService: FlashCardApiService,
        private fb: FormBuilder,
        private activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {
        this.createFlashCardForm();
    }

    createFlashCardForm(): void {
        this.flashCardForm = this.fb.group({
            question: [''],
            answer: [''],
        });
    }

    public close(): void {
        this.activeModal.dismiss();
    }
    

    public submit(): void {
        if (this.flashCardForm.invalid) {
            return;
        }
            
        this.createFlashCard();
    }

    createFlashCard(): void {
        const form = this.flashCardForm;
        const data = new CreateFlashCardRequest(
            form.get('question').value,
            form.get('answer').value,
            this.topicId,
        );

        this.flashCardApiService.createFlashCard(data).subscribe(
            data => {
                this.activeModal.close(data)
            },
            error => this.validationErrors = error.error.errors,
        );
    }

}
