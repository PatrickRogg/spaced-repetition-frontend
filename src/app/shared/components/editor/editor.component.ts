import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { EditorCommandService } from './services/editor-command.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: ElementRef;

  constructor(private editorCommandService: EditorCommandService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
    const editor = this.editor.nativeElement as HTMLElement;
    editor.appendChild(this.createFirstLine());
  }

  public handleBackspace(event: KeyboardEvent): void {
    const srcElement = event.srcElement as HTMLElement;

    if (srcElement.children.length === 1) {
      const lastElement = srcElement.firstChild as HTMLElement;
      
      if (lastElement.innerText.length > 1 || lastElement.tagName === `div`) {
        return;
      }

      const editor = this.editor.nativeElement as HTMLElement;
      editor.replaceChild(this.createFirstLine(), lastElement);
      event.preventDefault();
    }
  }

  public handleInput(event: KeyboardEvent): void {
    const focusElement = document.getSelection().focusNode as HTMLElement;
    const currentElement = this.getCurrentElement(focusElement);

    if (this.editorCommandService.isCommand(currentElement.innerHTML)) {
      const command = currentElement.innerHTML;
      currentElement.parentElement.replaceChild(
        this.editorCommandService.createElement(command),
        currentElement
      );
    }
  }

  public handleTab(event: KeyboardEvent) {
    event.preventDefault();
    console.log(window.getSelection().focusNode);
    const focusElement = document.getSelection().focusNode as HTMLElement;
    const currentElement = this.getCurrentElement(focusElement);
  }

  getCurrentElement(element: HTMLElement): HTMLElement {
    if (element.parentElement === this.editor.nativeElement) {
      return element;
    }

    return this.getCurrentElement(element.parentElement);
  }

  createFirstLine(): HTMLElement {
    const div = document.createElement(`div`);
    const br = document.createElement(`br`);
    div.appendChild(br);

    return div;
  }
}
