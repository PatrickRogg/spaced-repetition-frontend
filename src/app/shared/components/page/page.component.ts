import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageElementHandlerService } from '../../services/page-element-handler.service';
import { PageElementCreatorService } from '../../services/page-element-creator.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit, AfterViewInit {
    focusedElement: HTMLElement;

    @ViewChild('pageRootElement') pageRootElement: ElementRef;

    constructor(
        private pageElementHandlerService: PageElementHandlerService,
        private pageElementCreaterService: PageElementCreatorService,
        private router: Router,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

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
        const nextActiveElement = this.pageElementHandlerService.handleClick(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementSpace(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleSpace(event);
        this.setFocusedElement(nextActiveElement);
    }

    public handlePageElementArrowDown(event: any): void {
        const prevCaretPosition = window.getSelection().getRangeAt(0).startOffset;
        const nextActiveElement = this.pageElementHandlerService.handleArrowDown(event);
        
        this.setFocusedElement(nextActiveElement);
        this.setCaretPosition(nextActiveElement, prevCaretPosition);
    }

    public handlePageElementArrowUp(event: any): void {
        const prevCaretPosition = window.getSelection().getRangeAt(0).startOffset;
        const nextActiveElement = this.pageElementHandlerService.handleArrowUp(event);
        
        this.setFocusedElement(nextActiveElement);
        this.setCaretPosition(nextActiveElement, prevCaretPosition);
    }

    public handlePageElementArrowLeft(event: any): void {
        const caretPosition = window.getSelection().getRangeAt(0).startOffset;

        if (caretPosition === 0) {
            const nextActiveElement = this.pageElementHandlerService.handleArrowLeft(event);
            const nextCaretPosition = nextActiveElement ? nextActiveElement.innerText.length : 0;
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, nextCaretPosition);
        }
        
    }

    public handlePageElementArrowRight(event: any): void {
        const caretPosition = window.getSelection().getRangeAt(0).startOffset;

        if (caretPosition === event.srcElement.innerText.length) {
            const nextActiveElement = this.pageElementHandlerService.handleArrowRight(event);
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, 0);
        }
    }

    public handlePageElementBackspace(event: Event): void {
        let caretPosition = window.getSelection().getRangeAt(0).startOffset - 1;
        const srcElement = event.srcElement as HTMLElement
        const suffixLength = srcElement.innerText.length - caretPosition;
        const nextActiveElement = this.pageElementHandlerService.handleBackspace(event);

        if (srcElement !== nextActiveElement) {
            caretPosition = nextActiveElement.innerText.length - suffixLength + 1;
        }
        
        this.setFocusedElement(nextActiveElement);
        this.setCaretPosition(nextActiveElement, caretPosition);
    }

    public handlePaste(event: any) {
        const nextActiveElement = this.pageElementHandlerService.handlePaste(event);
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
        
        return root.childNodes.length === 1;
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
    }

    protected setCaretPosition(element: HTMLElement, caretPosition: number): void {
        if (!element) {
            return;
        }

        if (caretPosition < 0) {
            caretPosition = 0;
        }

        const textValue = element.innerText as string;
        const range = document.createRange();
        const selection = window.getSelection();
        const target = (element.firstChild) ? element.firstChild : element;

        if (textValue.length < caretPosition) {
            range.setStart(target, textValue.length);
            range.setEnd(target, textValue.length);
        } else {
            range.setStart(target, caretPosition);
            range.setEnd(target, caretPosition);
        }

        selection.removeAllRanges();
        selection.addRange(range);
    }

    protected initPage(): void {
        const rootElement = this.pageRootElement.nativeElement as HTMLElement;
        const titleElement = this.pageElementCreaterService.createTitle(`Untitled`);
        rootElement.appendChild(titleElement);
        this.setFocusedElement(titleElement);
    }
}
