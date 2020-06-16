import { Injectable } from '@angular/core';
import { PageElementCreatorService } from './page-element-creator.service';

@Injectable({
    providedIn: 'root'
})
export class PageElementHandlerService {

    constructor(
        private pageElementCreaterService: PageElementCreatorService,
    ) { }

    public handlePageElementKeydown(event: any): HTMLElement {
        if (event.key === `Enter`) {
            return this.handlePageElementEnter(event);
        } else if (event.key === `Backspace`) {
            return this.handlePageElementBackspace(event);
        } else if (event.key === `/`) {
            return this.handlePageElementSlash(event);
        } else if (event.key === `ArrowUp`) {
            return this.handlePageElementArrowUp(event);
        } else if (event.key === `ArrowDown`) {
            return this.handlePageElementArrowDown(event);
        }

        return null;
    }

    private handlePageElementEnter(event: any): HTMLElement {
        event.preventDefault();
        const parentElement = event.srcElement.parentElement as HTMLElement;
        const newPageElement = this.pageElementCreaterService.createDefault();
        parentElement.insertBefore(newPageElement, parentElement.nextSibling);
        
        return newPageElement;
    }

    private handlePageElementBackspace(event: any): HTMLElement {
        const srcElement = event.srcElement as HTMLElement;
        const prevElement = srcElement.previousSibling as HTMLElement;

        if (srcElement.innerText === `` && prevElement) {
            event.preventDefault();
            srcElement.remove();
            
            return prevElement;
        }

        return null;
    }

    private handlePageElementSlash(event: any): HTMLElement {
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
