import { Injectable } from '@angular/core';
import { PageElementCreatorService } from './page-element-creator.service';
import { Router } from '@angular/router';
import { ImageUploadApiService } from 'src/app/services/api/image-upload-api.service';

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
        private imageUploadApiService: ImageUploadApiService,
    ) {
    }

    public handleEnter(event: any): HTMLElement {
        const srcElement = event.srcElement;
        const text = srcElement.innerText;
        const parent = this.getParent(event.srcElement);

        if (text === this.HEADLINE_1_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline1();
            parent.parentNode.replaceChild(newPageElement, parent);
            return newPageElement;
        }

        if (text === this.HEADLINE_2_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline2();
            parent.parentNode.replaceChild(newPageElement, parent);
            return newPageElement;
        }

        if (text === this.HEADLINE_3_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createHeadline3();
            parent.parentNode.replaceChild(newPageElement, parent);
            return newPageElement;
        }

        if (text === this.PAGE_COMMAND) {
            const newPageElement = this.pageElementCreaterService.createPage();
            parent.parentNode.replaceChild(newPageElement, parent);
            this.router.navigate([`/notes/username/${newPageElement.getAttribute(`page-element-id`)}`]);
            return newPageElement;
        }

        if (this.isImageElement(parent)) {
            const newPageElement = this.pageElementCreaterService.createEmpty(``);
            parent.parentElement.insertBefore(newPageElement, parent.nextSibling);
            return newPageElement;
        }

        const cursorStartPosition = window.getSelection().getRangeAt(0).startOffset;
        const cursorEndPosition = window.getSelection().getRangeAt(0).endOffset;
        const nextPageElementText = srcElement.innerText.substring(cursorEndPosition);

        srcElement.innerText = srcElement.innerText.substring(0, cursorStartPosition);
        let newPageElement: HTMLElement;

        if (this.isListItem(parent) && srcElement.innerText.trim().length === 0) {
            newPageElement = this.pageElementCreaterService.createEmpty(nextPageElementText);
            srcElement.parentElement.parentElement.replaceChild(newPageElement, parent);
            return newPageElement;
        }

        if (parent.getAttribute(`element-type`) === this.pageElementCreaterService.UL_ITEM_ELEMENT_TYPE) {
            newPageElement = this.pageElementCreaterService.createUlItem(nextPageElementText);
        } else if (parent.getAttribute(`element-type`) === this.pageElementCreaterService.OL_ITEM_ELEMENT_TYPE) {
            newPageElement = this.pageElementCreaterService.createOlItem(nextPageElementText);
        } else {
            newPageElement = this.pageElementCreaterService.createEmpty(nextPageElementText);
        }

        parent.parentElement.insertBefore(newPageElement, parent.nextSibling);
        return this.getEditableElement(newPageElement);
    }

    public handleBackspace(event: any): HTMLElement {            
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        const prevElement = parent.previousSibling as HTMLElement;
        const cursorStartPosition = window.getSelection().getRangeAt(0).startOffset;
        const cursorEndPosition = window.getSelection().getRangeAt(0).endOffset;

        if (cursorStartPosition === 0 && cursorEndPosition === 0 && prevElement && srcElement.innerText.length === 0) {
            parent.remove();
            return this.getEditableElement(prevElement);
        }

        if (cursorStartPosition === 0 && cursorEndPosition === 0 && prevElement) {
            const text = srcElement.innerText;
            const prevEditableElement = this.getEditableElement(prevElement);
            prevEditableElement.innerText += text;
            parent.remove();
            return prevEditableElement;
        }
        const text = srcElement.innerText;

        if (cursorStartPosition === cursorEndPosition) {
            srcElement.innerText = text.substring(0, cursorStartPosition - 1) + text.substring(cursorStartPosition);
        } else {
            srcElement.innerText = text.substring(0, cursorStartPosition) + text.substring(cursorEndPosition);
        }
        
        return this.getEditableElement(parent);
    }

    public handleArrowUp(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        return this.moveToPrevElement(srcElement);
    }

    public handleArrowLeft(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        return this.moveToPrevElement(srcElement);
    }

    public handleArrowDown(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        return this.moveToNextElement(srcElement);
    }

    public handleArrowRight(event: any): HTMLElement {
        event.preventDefault();
        const srcElement = event.srcElement as HTMLElement;
        return this.moveToNextElement(srcElement);
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
        event.preventDefault();

        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        let blob = null;

        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                blob = item.getAsFile();
            }
        }

        if (blob !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                const resultAsString = reader.result.toString();
                const imageWrapperElement = this.pageElementCreaterService.createImage(resultAsString);
                parent.parentElement.replaceChild(imageWrapperElement, parent);
                const base64 = resultAsString.substr(resultAsString.indexOf(',') + 1);
                this.imageUploadApiService.uploadImage(base64).subscribe(
                    image => {
                        const imageLink = image.data.link
                        const imageElement = imageWrapperElement.firstChild as HTMLImageElement;
                        imageElement.src = imageLink;
                    }
                );
            };

            const emptyElement = this.pageElementCreaterService.createEmpty(``);
            parent.parentElement.insertBefore(emptyElement, parent.nextSibling);

            return this.getEditableElement(emptyElement);
        } else {
            const pastedText = event.clipboardData.getData('text/plain') as string;
            const pastedTextLines = pastedText.split(`\n`);
            let lastElement = srcElement;

            for (let i = 0; i < pastedTextLines.length; i++) {
                const line = pastedTextLines[i].trim();
                lastElement.innerText += line;

                if (i + 1 < pastedTextLines.length) {
                    const newPageElement = this.pageElementCreaterService.createEmpty(``);
                    parent.parentElement.insertBefore(newPageElement, parent.nextSibling);
                    lastElement = this.getEditableElement(newPageElement);
                }

            }

            return lastElement;
        }
    }

    public handleClick(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const parent = this.getParent(srcElement);

        if (this.isPageElement(parent)) {
            this.router.navigate([`/notes/username/${parent.getAttribute(`page-element-id`)}`]);
            event.preventDefault();
            return null;
        }

        if (this.isImageElement(parent)) {
            event.preventDefault();
            return null;
        }

        return this.getEditableElement(parent);
    }

    protected moveToNextElement(srcElement: HTMLElement): HTMLElement {
        const parent = this.getParent(srcElement);
        let nextElement = parent.nextSibling as HTMLElement;

        while (this.isPageElement(nextElement) || this.isImageElement(nextElement)) {
            nextElement = nextElement.nextSibling as HTMLElement;
        }

        return this.getEditableElement(nextElement);
    }

    protected moveToPrevElement(srcElement: HTMLElement): HTMLElement {
        const parent = this.getParent(srcElement);
        let prevElement = parent.previousSibling as HTMLElement;

        while (this.isPageElement(prevElement) || this.isImageElement(prevElement)) {
            prevElement = prevElement.previousSibling as HTMLElement;
        }

        return this.getEditableElement(prevElement);
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

    protected isPageElement(element: HTMLElement): boolean {
        return element && element.getAttribute(`element-type`) === this.pageElementCreaterService.PAGE_ELEMENT_TYPE;
    }

    protected isListItem(element: HTMLElement): boolean {
        return element.getAttribute(`element-type`) === this.pageElementCreaterService.UL_ITEM_ELEMENT_TYPE
            || element.getAttribute(`element-type`) === this.pageElementCreaterService.OL_ITEM_ELEMENT_TYPE;
    }

    protected isImageElement(element: HTMLElement): boolean {
        return element && element.getAttribute(`element-type`) == this.pageElementCreaterService.IMAGE_ELEMENT_TYPE;
    }
}
