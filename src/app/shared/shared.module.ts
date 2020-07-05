import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { DomChangeDirective } from './directives/dom-change.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EditorComponent } from './components/editor/editor.component';
import { CreateFlashCardComponent } from './components/create-flash-card/create-flash-card.component';
import { FlashCardsComponent } from './components/flash-cards/flash-cards.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomInputComponent,
    InputErrorMessageComponent,
    DomChangeDirective,
    SafeHtmlPipe,
    EditorComponent,
    CreateFlashCardComponent,
    FlashCardsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContenteditableModule,
    RouterModule,
  ],
  exports: [
    CustomInputComponent,
    InputErrorMessageComponent,
    SafeHtmlPipe,
    EditorComponent,
    CreateFlashCardComponent,
    FlashCardsComponent
  ],
})
export class SharedModule {}
