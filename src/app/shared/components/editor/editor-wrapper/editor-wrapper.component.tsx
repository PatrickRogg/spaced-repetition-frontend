import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import RichMarkdownEditor from "rich-markdown-editor";

const containerElementName = "richTextEditor";

@Component({
  selector: "app-editor-wrapper",
  template: `<div #${containerElementName}></div>`,
  encapsulation: ViewEncapsulation.None,
})
export class EditorWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;

  savedText = localStorage.getItem("saved");
  value = "\\\\\\\n\\\n";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  handleChange(value) {
    const text = value();
    console.log(value())
    localStorage.setItem("saved", text);
  }

  private render() {
    ReactDOM.render(
      <div>
        <RichMarkdownEditor
          id={"1"}
          placeholder={"123"}
          defaultValue={this.value}
          onChange={this.handleChange}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
