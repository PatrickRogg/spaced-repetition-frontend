import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PageElementCreatorService {
    public EMPTY_ELEMENT_TYPE = `empty`;
    public TITLE = `title`;
    public HEADLINE_1_ELEMENT_TYPE = `headline-1`;
    public HEADLINE_2_ELEMENT_TYPE = `headline-2`;
    public HEADLINE_3_ELEMENT_TYPE = `headline-3`;
    public UL_ITEM_ELEMENT_TYPE = `ul-item`;
    public OL_ITEM_ELEMENT_TYPE = `ol-item`;
    public PAGE_ELEMENT_TYPE = `page`;

    constructor() { }

    public createEmpty(text: string): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.EMPTY_ELEMENT_TYPE);
        element.innerText = text;
        const placeholderText = `Type / to use commands`;
        element.setAttribute(`placeholder`, placeholderText);
        element.addEventListener(`focus`, () => {
            element.setAttribute(`placeholder`, placeholderText);
        })
        return element;
    }

    public createTitle(text: string): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.TITLE);
        element.innerText = text;
        element.setAttribute(`placeholder`, `Title`);
        element.classList.add(`title`);

        return element;
    }

    public createHeadline1(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_1_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 1`);
        element.classList.add(`headline-1`);

        return element;
    }

    public createHeadline2(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_2_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 2`);
        element.classList.add(`headline-2`);

        return element;
    }

    public createHeadline3(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.HEADLINE_3_ELEMENT_TYPE);
        element.setAttribute(`placeholder`, `Headline 3`);
        element.classList.add(`headline-3`);

        return element;
    }

    public createUlItem(text: string): HTMLElement {
        const element = this.createPageElementWithId(`div`, this.UL_ITEM_ELEMENT_TYPE);
        element.classList.add(`wrapper`);
        element.appendChild(this.createUlDot());
        element.appendChild(this.createListItem(text));

        return element;
    }

    public createOlItem(text: string): HTMLElement {
        const element = this.createPageElementWithId(`div`, this.OL_ITEM_ELEMENT_TYPE);
        element.classList.add(`wrapper`);
        element.appendChild(this.createUlDot());
        element.appendChild(this.createListItem(text));

        return element;
    }

    public createPage(): HTMLElement {
        const element = this.createEditablePageElementWithId(`div`, this.PAGE_ELEMENT_TYPE);
        element.classList.add(`wrapper`, `page`);
        element.appendChild(this.createPageIcon());
        element.appendChild(this.createPageTitle());

        return element;
    }

    protected createUlDot(): HTMLElement {
        const element = document.createElement(`div`);
        element.innerText = `•`;
        element.classList.add(`ul-dot`);

        return element;
    }
    
    protected createListItem(text: string): HTMLElement {        
        const element = document.createElement(`div`);
        element.innerText = text;
        element.setAttribute(`placeholder`, `List item`);
        element.setAttribute(`contenteditable`, `true`);
        element.setAttribute(`spellcheck`, `true`);
        element.classList.add(`editable-div`, `l-item`);

        return element;
    }

    protected createPageElementWithId(tag: string, elementType: string): HTMLElement {
        const element = document.createElement(tag);
        element.setAttribute(`page-element-id`, this.generateUUID());
        element.setAttribute(`element-type`, elementType);

        return element;
    }

    protected createEditablePageElementWithId(tag: string, elementType: string): HTMLElement {
        const element = this.createPageElementWithId(tag, elementType);
        element.setAttribute(`contenteditable`, `true`);
        element.setAttribute(`spellcheck`, `true`);
        element.classList.add(`editable-div`);

        return element;
    }

    protected createPageIcon(): HTMLElement {
        const element = document.createElement(`div`);
        element.innerHTML = `<i class="far fa-file"></i>`;
        element.classList.add(`page-icon`);

        return element;
    }

    protected createPageTitle(): HTMLElement {
        const element = document.createElement(`div`);
        element.innerText = `Untitled`;
        element.classList.add(`page-title`);

        return element;
    }

    // https://stackoverflow.com/questions/55052621/how-to-customize-inserted-divs-of-contenteditable-on-line-breaks
    protected generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
