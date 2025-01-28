import { Injectable } from '@angular/core';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isWeekend,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';

import { CalendarDay } from '../interfaces/calendar.interface';
import { DATE_FORMAT, FIRST_DAY_OF_WEEK_INDEX, LAST_DAY_OF_WEEK_INDEX } from '../constants/calendar.constants';

@Injectable()
export class CalendarService {
  private weekdaysNames: string[];
  private selectedDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  constructor() {
    this.weekdaysNames = this.createWeekdayNames();
  }

  public getWeekdayNames(): string[] {
    return this.weekdaysNames;
  }

  public getSelectedDate(): Observable<Date> {
    return this.selectedDate$.asObservable();
  }

  public createCalendarDays = (): CalendarDay[] => {
    const selectedDate = this.selectedDate$.getValue();
    const year = getYear(selectedDate);
    const month = getMonth(selectedDate) + 1;
    const formattedToday = this.formatDate(new Date());
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
      const weekend = this.isWeekend(dateObj);
      days.push({ date, disabled: false, weekend, today: date === formattedToday });

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

  public prevMonth() {
    this.selectedDate$.next(subMonths(this.selectedDate$.getValue(), 1));
  }

  public nextMonth() {
    this.selectedDate$.next(addMonths(this.selectedDate$.getValue(), 1));
  }

  private createAdditionalDays(date: Date, toIndex: number): CalendarDay[] {
    return [...Array(toIndex).keys()].reduce((days: CalendarDay[], d) => {
      const addedDate = addDays(date, d);
      days.push({
        date: this.formatDate(addedDate),
        disabled: true,
        weekend: this.isWeekend(addedDate),
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

  private isWeekend(date: Date): boolean {
    return isWeekend(date);
  }
}
