import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';

@NgModule({
  declarations: [CustomInputComponent, InputErrorMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CustomInputComponent, InputErrorMessageComponent],
})
export class SharedModule {}
