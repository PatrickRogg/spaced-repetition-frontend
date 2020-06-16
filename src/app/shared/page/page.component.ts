import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    title = `Untitled`;
    content = ``;

    constructor() { }

    ngOnInit(): void {
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

    public domChange(mutation: any): void {
        console.log(mutation)
        mutation.addedNodes.forEach(node => node.id = this.generateUUID());
    }

    public generateUUID(): string {
        // https://stackoverflow.com/questions/55052621/how-to-customize-inserted-divs-of-contenteditable-on-line-breaks
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
