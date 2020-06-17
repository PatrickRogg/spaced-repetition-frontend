import { Injectable } from '@angular/core';
import { PageElementCreatorService } from './page-element-creator.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PageElementHandlerService {

    public HEADLINE_1_COMMAND = `/h1`;
    public HEADLINE_2_COMMAND = `/h2`;
    public HEADLINE_3_COMMAND = `/h3`;
    public PAGE_COMMAND = `/page`;

    constructor(
        private pageElementCreaterService: PageElementCreatorService,
        private router: Router,
    ) {
    }

    public handleEnter(event: any): HTMLElement {
        const srcElement = event.srcElement;
        const text = srcElement.innerText;

        if (text === this.HEADLINE_1_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline1();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
            return newPageElement;
        }

        if (text === this.HEADLINE_2_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline2();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
            return newPageElement;
        }

        if (text === this.HEADLINE_3_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline3();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
            return newPageElement;
        }

        if (text === this.PAGE_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createPage();
            srcElement.parentNode.replaceChild(newPageElement, srcElement);
            this.router.navigate([`/notes/username/${newPageElement.getAttribute(`page-element-id`)}`]);
            return newPageElement;
        }

        const nextPageElementText = ``;
        const parent = this.getParent(event.srcElement);
        console.log(parent)
        let newPageElement: HTMLElement;

        if (this.isListItem(srcElement) && srcElement.innerText.trim().length === 0) {
            newPageElement = this.pageElementCreaterService.createEmpty(nextPageElementText);
            srcElement.parentElement.parentElement.replaceChild(newPageElement, parent);
            console.log(1)
            return newPageElement;
        }
        
        if (parent.getAttribute(`element-type`) === this.pageElementCreaterService.UL_ITEM_ELEMENT_TYPE) {
            console.log(2)
            newPageElement = this.pageElementCreaterService.createUlItem(nextPageElementText);
        } else if (parent.getAttribute(`element-type`) === this.pageElementCreaterService.OL_ITEM_ELEMENT_TYPE) {
            newPageElement = this.pageElementCreaterService.createOlItem(nextPageElementText);
            console.log(3)
        } else {
            newPageElement = this.pageElementCreaterService.createEmpty(nextPageElementText);
            console.log(4)
        }
        console.log(4)

        parent.parentElement.insertBefore(newPageElement, parent.nextSibling);
        return this.getEditableElement(newPageElement);
    }

    public handleBackspace(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        const prevElement = parent.previousSibling as HTMLElement;
        const cursorStartPosition = window.getSelection().getRangeAt(0).startOffset;
        const cursorEndPosition = window.getSelection().getRangeAt(0).endOffset;

        if (cursorStartPosition === 0 && cursorEndPosition === 0 && prevElement) {
            event.preventDefault();
            parent.remove();

            return this.getEditableElement(prevElement);
        }

        return null;
    }

    public handleArrowUp(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        let prevElement = parent.previousSibling as HTMLElement;

        while (this.isPageElement(prevElement)) {
            prevElement = prevElement.previousSibling as HTMLElement;
        }

        return this.getEditableElement(prevElement);
    }

    public handleArrowDown(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        let nextElement = parent.nextSibling as HTMLElement;

        while (this.isPageElement(nextElement)) {
            nextElement = nextElement.nextSibling as HTMLElement;
        }

        return this.getEditableElement(nextElement);
    }

    public handleSpace(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        const text = srcElement.innerText;
        let newPageElement: HTMLElement = srcElement;

        if (text.length === 1 && text === `-`) {
            newPageElement = this.pageElementCreaterService.createUlItem(``);
            parent.parentNode.replaceChild(newPageElement, parent);
            event.preventDefault();
        } else if (text.length === 2 && text === `1.`) {
            newPageElement = this.pageElementCreaterService.createOlItem(``);
            parent.parentNode.replaceChild(newPageElement, parent);
            event.preventDefault();
        }

        return this.getEditableElement(newPageElement);
    }

    public handlePaste(event: any): HTMLElement {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        let blob = null;

        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                blob = item.getAsFile();
            }
        }

        if (blob !== null) {
            const reader = new FileReader();
            reader.onload = (evt: any) => {
                const base64String = evt.target.result;
            };
            reader.readAsDataURL(blob);
        }

        return null;
    }

    public handleClick(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);

        if (this.isPageElement(parent)) {
            this.router.navigate([`/notes/username/${parent.getAttribute(`page-element-id`)}`]);
            return null;
        }
        
        return this.getEditableElement(parent);
    }

    protected getParent(element: HTMLElement): HTMLElement {
        while (element && !element.getAttribute(`page-element-id`)) {
            element = element.parentElement;
        }

        return element;
    }

    protected getEditableElement(element: HTMLElement): HTMLElement {
        if (!element || !(element instanceof HTMLElement)) {
            return null
        }

        if (element.getAttribute(`contenteditable`)) {
            return element;
        }

        for (let child = element.firstChild; child; child = child.nextSibling) {
            const res = this.getEditableElement(child as HTMLElement);

            if (res) {
                return res;
            }
        }

        return null;
    }

    protected isPageElement(nextElement: HTMLElement) {
        return nextElement && nextElement.getAttribute(`element-type`) === this.pageElementCreaterService.PAGE_ELEMENT_TYPE;
    }

    protected isListItem(srcElement: HTMLElement) {
        return srcElement.parentElement.getAttribute(`element-type`) === this.pageElementCreaterService.UL_ITEM_ELEMENT_TYPE
            || srcElement.parentElement.getAttribute(`element-type`) === this.pageElementCreaterService.OL_ITEM_ELEMENT_TYPE;
    }
}
