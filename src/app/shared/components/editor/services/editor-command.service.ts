import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorCommandService {
  private commandToElement: Map<string, Function>;

  constructor() {
    this.commandToElement = new Map<string, Function>();
    this.commandToElement.set(`/h1`, this.createHeadline1);
    this.commandToElement.set(`/h2`, this.createHeadline2);
    this.commandToElement.set(`/h3`, this.createHeadline3);
    this.commandToElement.set(`-&nbsp;`, this.createUl);
    this.commandToElement.set(`1.&nbsp;`, this.createOl);
  }

  public isCommand(text: string): boolean {
    return this.commandToElement.has(text);
  }

  public createElement(command: string): HTMLElement {
    return this.commandToElement.get(command).apply(this);
  }

  private createHeadline1(): HTMLElement {
    const element = document.createElement(`h1`);
    element.appendChild(document.createElement(`br`));

    return element;
  }

  private createHeadline2(): HTMLElement {
    const element = document.createElement(`h2`);
    element.appendChild(document.createElement(`br`));

    return element;
  }

  private createHeadline3(): HTMLElement {
    const element = document.createElement(`h3`);
    element.appendChild(document.createElement(`br`));

    return element;
  }

  private createUl(): HTMLElement {
    const element = document.createElement(`ul`);
    const li = document.createElement(`li`);
    li.setAttribute(`tabindex`, `1`);
    element.appendChild(li);
    li.focus();

    return element;
  }

  private createOl(): HTMLElement {
    const element = document.createElement(`ol`);
    const li = document.createElement(`li`);
    li.setAttribute(`tabindex`, `1`);
    element.appendChild(li);

    return element;
  }

  private createImage(): HTMLElement {
    const element = document.createElement(`ol`);
    const li = document.createElement(`li`);
    element.appendChild(li);
    li.focus();

    return element;
  }
}
