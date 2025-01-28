import { Injectable } from '@angular/core';
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfWeek,
  subDays,
} from 'date-fns';

import { CalendarDay } from '../interfaces/calendar.interface';
import { DATE_FORMAT, FIRST_DAY_OF_WEEK_INDEX, LAST_DAY_OF_WEEK_INDEX } from '../constants/calendar.constants';

@Injectable()
export class CalendarService {
  private weekdaysNames: string[];

  constructor() {
    this.weekdaysNames = this.createWeekdayNames();
  }

  public getWeekdayNames(): string[] {
    return this.weekdaysNames;
  }

  public createCalendarDays = (): CalendarDay[] => {
    const today = new Date();
    const year = getYear(today);
    const month = getMonth(today) + 1;
    const numberOfDayInMonth = getDaysInMonth(new Date(`${year}-${month}`));

    return [...Array(numberOfDayInMonth)].reduce((days: CalendarDay[], _, index) => {
      const dateObj = new Date(`${year}-${month}-${index + 1}`);
      const dayIndex = getDay(dateObj);

      // if 1st day of month is not Sunday, need to fill these gap days from previous month
      if (index === 0 && dayIndex !== FIRST_DAY_OF_WEEK_INDEX) {
        const prevDays = this.createAdditionalDays(subDays(dateObj, dayIndex), dayIndex);
        for (const day of prevDays) {
          days.push(day);
        }
      }

      const date = this.formatDate(dateObj);
      days.push({ date });

      // if last day of month is not Saturday, need to fill these gap days from next month
      if (index === numberOfDayInMonth - 1 && dayIndex !== LAST_DAY_OF_WEEK_INDEX) {
        const nextDays = this.createAdditionalDays(addDays(dateObj, 1), LAST_DAY_OF_WEEK_INDEX - dayIndex);
        for (const day of nextDays) {
          days.push(day);
        }
      }

      return days;
    }, []);
  };

  private createAdditionalDays(date: Date, toIndex: number): CalendarDay[] {
    return [...Array(toIndex).keys()].reduce((days: CalendarDay[], d) => {
      const addedDate = addDays(date, d);
      days.push({
        date: this.formatDate(addedDate),
      });

      return days;
    }, []);
  }

  private createWeekdayNames(): string[] {
    return eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: 0 }),
      end: endOfWeek(new Date(), { weekStartsOn: 0 }),
    }).map(date => format(date, 'EEEE'));
  }

  private formatDate(date: Date): string {
    return format(date, DATE_FORMAT);
  }
}
