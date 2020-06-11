import { Component, OnInit, Input } from '@angular/core';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import ImageUploader from 'quill-image-uploader';
import { FormControl } from '@angular/forms';
import { ImageUploadApiService } from 'src/app/services/api/image-upload-api.service';
Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

@Component({
    selector: 'app-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit {

    @Input() control: FormControl;

    modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image']
            ]
        },
        imageResize: true,
        imageUploader: {
            upload: async (file) => {
                const result = await this.getBase64(file).catch(e => Error(e));

                if(result instanceof Error) {
                    return;
                 }
                
                return new Promise((resolve, reject) => {
                    this.imageUploadApiService.uploadImage(result).subscribe(
                        image => resolve(image.data.link),
                        error => {
                            console.log(error);
                            reject(error)
                        }
                    );
                });
            },
        },
    };

    async getBase64(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const resultAsString = reader.result.toString();
                resolve(resultAsString.substr(resultAsString.indexOf(',') + 1));
            };
            reader.onerror = error => reject(error);
        });
    }

    constructor(
        private imageUploadApiService: ImageUploadApiService,
    ) { }

    ngOnInit(): void {
    }

}
