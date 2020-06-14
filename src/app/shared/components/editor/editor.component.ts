import { Component, OnInit, Input } from '@angular/core';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @Input() value: string;
    private CLIENT_ID = `b874cc631c8075c`;
    public editor = InlineEditor;
    editorConfig = {
        placeholder: 'Type the content here!',
        simpleUpload: {
            uploadUrl: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: `Client-ID ${this.CLIENT_ID}`,
                'Content-Type': 'application/json'
            }
        }
    };

    constructor(
    ) { }

    ngOnInit() {

    }

    public inputChange(event): void {
        console.log(event)
    }
}
