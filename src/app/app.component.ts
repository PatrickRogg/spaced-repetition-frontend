import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private location: Location) {}

  public isNavbarDisplayed(): boolean {
    const path = this.location.path();
    return !path.includes('/spaced-repetition') && !path.includes(`workspace`);
  }

  public isFooterDisplayed(): boolean {
    const path = this.location.path();
    return (
      !path.includes('sign-up') &&
      !path.includes('sign-in') &&
      !path.includes('/spaced-repetition')
    );
  }
}
