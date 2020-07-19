import { Injectable } from '@angular/core';
import { LEVEL_DAY_DELAYS } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class NextRepetitionService {
  constructor() {}

  public getNextRepetition(lastWrongAnswer: Date, level: number): Date {
    const resultDate = new Date(lastWrongAnswer);
    resultDate.setDate(resultDate.getDate() + LEVEL_DAY_DELAYS[level - 1]);
    return this.getToStartOfDay(resultDate);
  }

  private getToStartOfDay(resultDate: Date): Date {
    resultDate.setMilliseconds(0);
    resultDate.setSeconds(0);
    resultDate.setMinutes(0);
    resultDate.setHours(0);
    return resultDate;
  }
}
