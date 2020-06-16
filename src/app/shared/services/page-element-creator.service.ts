import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PageElementCreatorService {

    constructor() { }

    public createDefault(): HTMLElement {
        const pageElement = document.createElement(`div`);
        pageElement.id = this.generateUUID();
        pageElement.setAttribute(`contenteditable`, `true`);
        pageElement.classList.add(`editable-div`);
        return pageElement;
    }

    public generateUUID(): string {
        // https://stackoverflow.com/questions/55052621/how-to-customize-inserted-divs-of-contenteditable-on-line-breaks
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
