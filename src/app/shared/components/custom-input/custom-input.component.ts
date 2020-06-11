import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {
    @Input() type: string = 'text';
    @Input() label: string = ``;
    @Input() autofocus = false;
    @Input() placeholder: string = ``;
    @Input() name: string;
    @Input() control: FormControl;
    @Input() errors: object;

    constructor() { }

    ngOnInit(): void {
    }

    public hasError(): boolean {
        return this.errors[this.name] !== undefined;
    }
}
