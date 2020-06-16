import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageElementHandlerService } from '../services/page-element-handler.service';
import { PageElementCreatorService } from '../services/page-element-creator.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit, AfterViewInit {
    title = `Untitled`;
    @ViewChild('pageElements') pageElements: ElementRef;
    focusedElement: HTMLElement;

    constructor(
        private pageElementHandlerService: PageElementHandlerService,
        private pageElementCreaterService: PageElementCreatorService,
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.createDefaultPageElement();
    }

    public handlePageElement(event: any): void {
        const pageElement = this.pageElementHandlerService.handlePageElementKeydown(event);

        if (pageElement) {
            this.setFocusedElement(pageElement);
        }
    }

    public headlineEnter(event: any): void {
        event.preventDefault();
        const element = event.srcElement.nextElementSibling;

        if (element == null) {
            return;
        } else {
            element.focus();
        }
    }

    createDefaultPageElement(): void {
        const pageElement = this.pageElementCreaterService.createEmptyElement();
        const parentElement = this.pageElements.nativeElement as HTMLElement
        parentElement.appendChild(pageElement);
        this.setFocusedElement(pageElement);
    }

    setFocusedElement(element: HTMLElement): void {
        if (this.isEmptyElement(element)) {
            this.focusedElement.removeAttribute(`placeholder`);
        }

        this.focusedElement = element;
        this.focusedElement.focus();
        this.moveCursorToEndOf(this.focusedElement);
    }

    private isEmptyElement(element: HTMLElement) {
        return this.focusedElement && this.focusedElement !== element &&
            this.focusedElement.getAttribute(`element-type`) === this.pageElementCreaterService.EMPTY_ELEMENT_TYPE;
    }

    moveCursorToEndOf(element: HTMLElement) {
        let range: any;
        let selection: any;

        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

}
