import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-page-wrapper',
    templateUrl: './page-wrapper.component.html',
    styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {

    // x1 = 0;
    // x2 = 0;
    // y1 = 0;
    // y2 = 0;
    // xOffset = 0;
    // yOffset = 0;
    // isLeftMouseButtonPressed = false;

    // @Input() pageRootElement: ElementRef;
    // @ViewChild('dragSelectBox') dragBox: ElementRef;

    constructor() { }

    ngOnInit(): void {

    }

    // public mousedown(event: MouseEvent): void {
    //     this.dragBox.nativeElement.hidden = 0;
    //     const srcElement = event.srcElement as HTMLElement;
    //     this.xOffset = srcElement.getBoundingClientRect().left;
    //     this.yOffset = srcElement.getBoundingClientRect().top;
    //     console.log(event.clientY, event.pageY, event.offsetY, event.y)
    //     this.x1 = event.offsetX + this.xOffset;
    //     this.y1 = event.offsetY + this.yOffset;
    //     this.x2 = event.offsetX + this.xOffset;
    //     this.y2 = event.offsetY + this.yOffset;
    //     this.reCalc();
    //     this.isLeftMouseButtonPressed = true;
    // }

    // public mouseup(event: MouseEvent): void {
    //     this.dragBox.nativeElement.hidden = 1;
    //     this.x1 = 0;
    //     this.x2 = 0;
    //     this.y1 = 0;
    //     this.y2 = 0;
    //     this.isLeftMouseButtonPressed = false;
    // }

    // public mousemove(event: MouseEvent): void {
    //     if (this.isLeftMouseButtonPressed) {
    //         this.x2 = event.offsetX - this.xOffset;
    //         this.y2 = event.clioffsetXentY - this.yOffset;
    //         this.reCalc();
    //     }
    // }

    // protected reCalc(): void {
    //     var x3 = Math.min(this.x1, this.x2);
    //     var x4 = Math.max(this.x1, this.x2);
    //     var y3 = Math.min(this.y1, this.y2);
    //     var y4 = Math.max(this.y1, this.y2);
    //     this.dragBox.nativeElement.style.left = x3 + 'px';
    //     this.dragBox.nativeElement.style.top = y3 + 'px';
    //     this.dragBox.nativeElement.style.width = x4 - x3 + 'px';
    //     this.dragBox.nativeElement.style.height = y4 - y3 + 'px';
    // }

}
