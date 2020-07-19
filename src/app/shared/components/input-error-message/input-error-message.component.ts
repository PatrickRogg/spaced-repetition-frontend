import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss'],
})
export class InputErrorMessageComponent implements OnInit {
  @Input() errors: string;
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}

  public hasError(): boolean {
    return this.errors[this.name] !== undefined;
  }

  public getErrorMessage(): string {
    return this.errors[this.name];
  }
}
