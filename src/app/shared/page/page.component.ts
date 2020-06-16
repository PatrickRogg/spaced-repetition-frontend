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
    activePageElement: HTMLElement;

    constructor(
        private pageElementHandlerService: PageElementHandlerService,
        private pageElementCreaterService: PageElementCreatorService,
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.createDefaultPageElement();
    }

    public handlePageElementKeydown(event: any): void {
        const newActivePageElement = this.pageElementHandlerService.handlePageElementKeydown(event);

        if (newActivePageElement) {
            this.setActivePageElement(newActivePageElement);
        }
    }

    setActivePageElement(newActivePageElement: HTMLElement) {
        newActivePageElement.focus();
        this.activePageElement.setAttribute(`placeholder`, ``);
        newActivePageElement.setAttribute(`placeholder`, `Type / to use commands`);
        this.activePageElement = newActivePageElement;
        this.moveCursorToEndOf(newActivePageElement);
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

    createDefaultPageElement(): void {
        const pageElement = this.pageElementCreaterService.createDefault();
        pageElement.setAttribute(`placeholder`, `Type / to use commands`);
        pageElement.focus();

        const parentElement = this.pageElements.nativeElement as HTMLElement
        parentElement.appendChild(pageElement);

        this.activePageElement = pageElement;
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
