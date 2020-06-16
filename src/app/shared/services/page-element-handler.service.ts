import { Injectable } from '@angular/core';
import { PageElementCreatorService } from './page-element-creator.service';

@Injectable({
    providedIn: 'root'
})
export class PageElementHandlerService {

    public HEADLINE_1_COMMAND = `/h1`;
    public HEADLINE_2_COMMAND = `/h2`;
    public HEADLINE_3_COMMAND = `/h3`;

    constructor(
        private pageElementCreaterService: PageElementCreatorService,
    ) { }

    public handlePageElementKeydown(event: any): HTMLElement {
        if (event instanceof MouseEvent) {
            return event.target as HTMLElement;
        }

        if (event.key === `Enter`) {
            return this.handlePageElementEnter(event);
        } else if (event.key === `Backspace`) {
            return this.handlePageElementBackspace(event);
        } else if (event.key === `ArrowUp`) {
            return this.handlePageElementArrowUp(event);
        } else if (event.key === `ArrowDown`) {
            return this.handlePageElementArrowDown(event);
        }

        return null;
    }

    private handlePageElementEnter(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        const text = srcElement.innerText;
        let newPageElement: HTMLElement;

        if (text === this.HEADLINE_1_COMMAND) {
            newPageElement = this.pageElementCreaterService.createHeadline1Element();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
        } else if (text === this.HEADLINE_2_COMMAND) {
            newPageElement = this.pageElementCreaterService.createHeadline2Element();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
        } else if (text === this.HEADLINE_3_COMMAND) {
            newPageElement = this.pageElementCreaterService.createHeadline3Element();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
        } else {
            newPageElement = this.pageElementCreaterService.createEmptyElement();
            srcElement.parentElement.insertBefore(newPageElement, srcElement.nextSibling);
        }

        return newPageElement;
    }

    private handlePageElementBackspace(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const prevElement = srcElement.previousSibling as HTMLElement;

        if (srcElement.innerText === `` && prevElement) {
            event.preventDefault();
            srcElement.remove();

            return prevElement;
        } else if (srcElement.innerText === ``) {
            event.preventDefault();
            const replacementPageElement = this.pageElementCreaterService.createEmptyElement();
            srcElement.parentNode.replaceChild(replacementPageElement, srcElement);

            return replacementPageElement;
        }

        return null;
    }

    private handlePageElementArrowUp(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const prevElement = srcElement.previousSibling as HTMLElement;

        if (prevElement) {
            return prevElement;
        }

        return null;
    }

    private handlePageElementArrowDown(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const nextElement = srcElement.nextSibling as HTMLElement;

        if (nextElement) {
            return nextElement;
        }

        return null;
    }
}
