import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageElement } from './models/page-element.model';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit, AfterViewInit {
    title = `Untitled`;
    @ViewChild('pageElements') pageElements: ElementRef;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        const root = this.pageElements.nativeElement as HTMLElement
        const pageElement = this.createPageElement();
        root.appendChild(pageElement)
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

    createPageElement() {
        const pageElement = document.createElement(`div`);
        pageElement.id = this.generateUUID();
        pageElement.setAttribute(`contenteditable`, `true`);
        pageElement.setAttribute('placeholder', 'Type / to use commands');
        return pageElement;
    }

    public handlePageElementKeydown(event: any): void {
        if (event.key === `Enter`) {
            this.handlePageElementEnter(event);
        } else if (event.key === `Backspace`) {
            this.handlePageElementBackspace(event);
        } else if (event.key === `/`) {
            this.handlePageElementSlash(event);
        } else if (event.key === `ArrowUp`) {
            this.handlePageElementArrowUp(event);
        } else if (event.key === `ArrowDown`) {
            this.handlePageElementArrowDown(event);
        }

        console.log(event)
    }

    handlePageElementEnter(event: any): void {
        event.preventDefault();
        const parentElement = event.srcElement.parentElement as HTMLElement;
        const newPageElement = this.createPageElement();
        parentElement.insertBefore(newPageElement, parentElement.nextSibling);
        newPageElement.focus();
    }

    handlePageElementBackspace(event: any): void {
        const srcElement = event.srcElement as HTMLElement;
        const prevElement = srcElement.previousSibling as HTMLElement;

        if (srcElement.innerText === `` && prevElement) {
            event.preventDefault();
            
            prevElement.focus();
            srcElement.remove();
        }
    }

    handlePageElementSlash(event: any): void {
    }

    handlePageElementArrowUp(event: any): void {
        const srcElement = event.srcElement as HTMLElement;
        const prevElement = srcElement.previousSibling as HTMLElement;

        if (prevElement) {
            prevElement.focus()
        }
    }

    handlePageElementArrowDown(event: any): void {
        const srcElement = event.srcElement as HTMLElement;
        const nextElement = srcElement.nextSibling as HTMLElement;

        if (nextElement) {
            nextElement.focus()
        }
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
