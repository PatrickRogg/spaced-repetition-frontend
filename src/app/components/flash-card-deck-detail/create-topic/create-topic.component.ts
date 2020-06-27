import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TopicApiService } from 'src/app/services/api/topic-api.service';
import { Topic } from 'src/app/models/topic.model';
import { ErrorResponse } from 'src/app/models/error-response.model';
import { CreateUpdateTopic } from 'src/app/models/create-update-topic.model';

@Component({
    selector: 'app-create-topic',
    templateUrl: './create-topic.component.html',
    styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
    @Input() flashCardDeckId: number;

    @Output() createTopicEventEmitter = new EventEmitter<Topic>();
    
    validationErrors = new ErrorResponse({});

    constructor(
        private topicApiService: TopicApiService,
    ) { }

    ngOnInit(): void {
    }

    public create(): void {
        const data = new CreateUpdateTopic();
        data.flashCardDeckId = this.flashCardDeckId;
        data.name = `Unnamed Topic`;


        this.topicApiService.create(data).subscribe(
            data => {
                this.createTopicEventEmitter.emit(data);
                this.validationErrors = new ErrorResponse({});
            },
            error => {
                if (error.error) {
                    this.validationErrors = error.error.errors;
                }
            }
        )
    }

}
