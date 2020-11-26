import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit {
  @Input() control: FormControl;

  public Editor = ClassicEditor;
  editorConfig = {
    placeholder: 'Add the answer here.',
    extraPlugins: [ this.imagePluginFactory ],
  };

  constructor() {}

  ngOnInit(): void {
  }

  imagePluginFactory(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CloudinaryUnsigned( loader, `dscmuxssa`, `hv1inlo6`);
    };
  }
}
