import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { DomChangeDirective } from './directives/dom-change.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PageComponent } from './components/page-wrapper/page/page.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';




@NgModule({
    declarations: [
        CustomInputComponent,
        InputErrorMessageComponent,
        PageComponent,
        DomChangeDirective,
        SafeHtmlPipe,
        PageWrapperComponent,
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
        PageWrapperComponent,
        SafeHtmlPipe,
    ]
})
export class SharedModule { }
