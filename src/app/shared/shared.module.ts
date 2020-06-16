import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { PageComponent } from './page/page.component';
import { DomChangeDirective } from './directives/dom-change.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';




@NgModule({
    declarations: [
        CustomInputComponent,
        InputErrorMessageComponent,
        PageComponent,
        DomChangeDirective,
        SafeHtmlPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContenteditableModule,
    ],
    exports: [
        CustomInputComponent,
        InputErrorMessageComponent,
        PageComponent,
        SafeHtmlPipe,
    ]
})
export class SharedModule { }
