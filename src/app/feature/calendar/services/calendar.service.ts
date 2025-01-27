import { Injectable } from '@angular/core';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

@Injectable()
export class CalendarService {
  private weekDaysNames: string[];

  constructor() {
    this.weekDaysNames = this.createWeekDayNames();
  }

  public getWeekDayNames(): string[] {
    return this.weekDaysNames;
  }

  private createWeekDayNames(): string[] {
    return eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: 0 }),
      end: endOfWeek(new Date(), { weekStartsOn: 0 }),
    }).map(date => format(date, 'EEEE'));
  }
}
