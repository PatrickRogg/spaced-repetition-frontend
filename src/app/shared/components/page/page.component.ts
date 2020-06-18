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
        const prevCaretPosition = 1;
        const nextActiveElement = this.pageElementHandlerService.handleArrowDown(event);
        
        if (nextActiveElement) {
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, prevCaretPosition);
        }
    }

    public handlePageElementArrowUp(event: any): void {
        const prevCaretPosition = 1;
        const nextActiveElement = this.pageElementHandlerService.handleArrowUp(event);
        
        if (nextActiveElement) {
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, prevCaretPosition);
        }
    }

    public handlePageElementArrowLeft(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleArrowLeft(event);

        if (nextActiveElement) {
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, 1);
        }
    }

    public handlePageElementArrowRight(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleArrowRight(event);

        if (nextActiveElement) {
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, 1);
        }
    }

    public handlePageElementBackspace(event: any): void {
        const nextActiveElement = this.pageElementHandlerService.handleBackspace(event);
        
        if (nextActiveElement) {
            this.setFocusedElement(nextActiveElement);
            this.setCaretPosition(nextActiveElement, 1);
        }
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
        if (this.focusedElement && this.focusedElement !== element &&
            this.focusedElement.getAttribute(`element-type`) === this.pageElementCreaterService.EMPTY_ELEMENT_TYPE) {
            this.focusedElement.setAttribute(`placeholder`, ``)
        }

        this.focusedElement = element;
        element.focus();
    }

    protected setCaretPosition(element: HTMLElement, position: number): void {
        const range = document.createRange();
        const textNode = element.firstChild as HTMLElement;
        console.log(textNode)
        if (textNode.innerText.length < position) {
            range.setStart(textNode, textNode.innerText.length);
            range.setEnd(element.firstChild, textNode.innerText.length);
        } else {
            range.setStart(element.firstChild, position);
            range.setEnd(element.firstChild, position);
        }

        const selection = window.getSelection();
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
