import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { DomChangeDirective } from './directives/dom-change.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EditorComponent } from './components/editor/editor.component';
import { EditorWrapperComponent } from './components/editor/editor-wrapper/editor-wrapper.component';


@NgModule({
    declarations: [
        CustomInputComponent,
        InputErrorMessageComponent,
        DomChangeDirective,
        SafeHtmlPipe,
        EditorComponent,
        EditorWrapperComponent,
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
        SafeHtmlPipe,
        EditorComponent
    ]
})
export class SharedModule { }
