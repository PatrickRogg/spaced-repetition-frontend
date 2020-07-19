import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConverterService {
  constructor() {}

  public convertToUTC(date: Date): Date {
    const utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    return new Date(utc);
  }
}
