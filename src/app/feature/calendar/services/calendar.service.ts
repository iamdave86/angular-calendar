import { Injectable } from '@angular/core';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

@Injectable()
export class CalendarService {
  private weekdaysNames: string[];

  constructor() {
    this.weekdaysNames = this.createWeekdayNames();
  }

  public getWeekdayNames(): string[] {
    return this.weekdaysNames;
  }

  private createWeekdayNames(): string[] {
    return eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: 0 }),
      end: endOfWeek(new Date(), { weekStartsOn: 0 }),
    }).map(date => format(date, 'EEEE'));
  }
}
