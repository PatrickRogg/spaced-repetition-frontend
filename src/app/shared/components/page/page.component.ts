import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageElementHandlerService } from '../../services/page-element-handler.service';
import { PageElementCreatorService } from '../../services/page-element-creator.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit, AfterViewInit {
    focusedElement: HTMLElement;

    @ViewChild('pageRootElement') pageRootElement: ElementRef;

    constructor(
        private pageElementHandlerService: PageElementHandlerService,
        private pageElementCreaterService: PageElementCreatorService,
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.initPage();
    }

    public handlePageElementEnter(event: any): void {
        event.preventDefault();
        const nextActiveElement = this.pageElementHandlerService.handleEnter(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementClick(event: any): void {
        this.setFocusedElement(event.target);
    }

    public handlePageElementSpace(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleSpace(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementArrowDown(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleArrowDown(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementArrowUp(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleArrowUp(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementBackspace(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleBackspace(event);
        this.setFocusedElement(nextActiveElement);
    }

    public createFirstPageElement(event: any): void {
        const element = this.pageElementCreaterService.createEmpty(``);
        this.focusedElement.parentElement.appendChild(element);
        this.setFocusedElement(element);
    }

    public isPageEmpty(): boolean {
        if (!this.pageRootElement) {
            return true;
        }
        const root = this.pageRootElement.nativeElement as HTMLElement;
        return root.childNodes.length === 1
    }

    protected setFocusedElement(element: HTMLElement): void {
        if (!element) {
            return;
        }

        if (this.focusedElement && this.focusedElement !== element &&
            this.focusedElement.getAttribute(`element-type`) === this.pageElementCreaterService.EMPTY_ELEMENT_TYPE) {
            this.focusedElement.setAttribute(`placeholder`, ``)
        }

        this.focusedElement = element;
        element.focus();
        this.moveCursorToEndOf(this.focusedElement);
    }

    protected moveCursorToEndOf(element: HTMLElement) {
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

    protected initPage(): void {
        const rootElement = this.pageRootElement.nativeElement as HTMLElement;
        const titleElement = this.pageElementCreaterService.createTitle(`Untitled`);
        rootElement.appendChild(titleElement);
        this.setFocusedElement(titleElement);
    }
}
