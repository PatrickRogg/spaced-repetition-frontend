import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMessageComponent } from './components/input-error-message/input-error-message.component';
import { EditorComponent } from './components/editor/editor.component';




@NgModule({
    declarations: [
        CustomInputComponent,
        InputErrorMessageComponent,
        EditorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule
    ],
    exports: [
        CustomInputComponent,
        InputErrorMessageComponent,
        EditorComponent,
    ]
})
export class SharedModule { }
