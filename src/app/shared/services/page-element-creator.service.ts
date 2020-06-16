import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PageElementCreatorService {
    public EMPTY_ELEMENT_TYPE = `empty`;
    public HEADLINE_1_ELEMENT_TYPE = `headline-1`;
    public HEADLINE_2_ELEMENT_TYPE = `headline-2`;
    public HEADLINE_3_ELEMENT_TYPE = `headline-3`;
    public UL_ITEM_ELEMENT_TYPE = `ul-item`;

    constructor() { }

    public createEmptyElement(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.EMPTY_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, ``)
        element.addEventListener(`focus`, () => {
            element.setAttribute(`placeholder`, `Type / to use commands`)
        });

        return element;
    }

    public createHeadline1Element(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_1_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 1`);
        element.classList.add(`headline-1`);

        return element;
    }

    public createHeadline2Element(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_2_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 2`);
        element.classList.add(`headline-2`);

        return element;
    }

    public createHeadline3Element(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_3_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 3`);
        element.classList.add(`headline-3`);

        return element;
    }

    public createUlItemElement(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.UL_ITEM_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `List item`);
        element.classList.add(`ul-item`);

        return element;
    }

    createEditablePageElementWithId(tag: string, elementType: string): HTMLElement {
        const element = document.createElement(tag);
        element.setAttribute(`page-element-id`, this.generateUUID());
        element.setAttribute(`contenteditable`, `true`);
        element.setAttribute(`spellcheck`, `true`);
        element.setAttribute(`element-type`, elementType);
        element.classList.add(`editable-div`);

        return element;
    }

    // https://stackoverflow.com/questions/55052621/how-to-customize-inserted-divs-of-contenteditable-on-line-breaks
    generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
