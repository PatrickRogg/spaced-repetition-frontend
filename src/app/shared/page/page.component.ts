import { Component, OnInit, Renderer2 } from '@angular/core';
import { PageElement } from './models/page-element.model';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    title = `Untitled`;
    pageElements: PageElement[] = [
        this.getNewPageElement()
    ];

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
    }

    public headlineEnter(event: any): void {
        event.preventDefault();
        let element = event.srcElement.nextElementSibling;

        if (element == null) {
            return;
        } else {
            element.focus();
        }
    }

    public pageElementKeydow(event: KeyboardEvent): void {
        if (event.key === `Enter`) {
            this.handlePageElementEnter(event);
        } else if (event.key === `Backspace`) {
            this.handlePageElementBackspace(event);
        } else if (event.key === `/`) {
            this.handlePageElementSlash(event);
        }
    }

    handlePageElementEnter(event: any): void {
        event.preventDefault();
        const srcElementId = event.srcElement.id;
        const newPageElements = [];
        const newPageElement = this.getNewPageElement();

        for (let i = 0; i < this.pageElements.length; i++) {
            newPageElements.push(this.pageElements[i]);

            if (this.pageElements[i].id === srcElementId) {
                newPageElements.push(newPageElement);
            }
        }

        this.pageElements = newPageElements;
        //this.renderer.selectRootElement(newPageElement.id).focus();
    }

    handlePageElementBackspace(event: any): void {
        const srcElementInnerText = event.srcElement.innerText;
        const srcElementId = event.srcElement.id;

        if (srcElementInnerText === `` && this.pageElements.length > 1) {
            const newPageElements = [];

            for (let i = 0; i < this.pageElements.length; i++) {
                if (this.pageElements[i].id !== srcElementId) {
                    newPageElements.push(this.pageElements[i]);
                }
            }

            this.pageElements = newPageElements;
        }
    }

    handlePageElementSlash(event: any): void {
    }

    public getNewPageElement(): PageElement {
        return new PageElement(this.generateUUID(), `empty`, ``)
    }

    public domChange(mutation: any): void {
        mutation.addedNodes.forEach(node => node.id = this.generateUUID());
    }

    public generateUUID(): string {
        // https://stackoverflow.com/questions/55052621/how-to-customize-inserted-divs-of-contenteditable-on-line-breaks
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
