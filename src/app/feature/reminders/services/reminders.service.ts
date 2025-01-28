import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Reminder } from '../interfaces/reminder.interface';
import { REMINDER_TEXT_MAX_LENGTH } from '../constants/reminder.constant';

@Injectable()
export class RemindersService {
  private reminders$: BehaviorSubject<Reminder[]>;

  constructor() {
    this.reminders$ = new BehaviorSubject<Reminder[]>([]);
  }

  public getReminders(): Observable<Reminder[]> {
    return this.reminders$.asObservable();
  }

  public createReminder(data: Omit<Reminder, 'id'>) {
    const { text } = data;
    const newItem = {
      ...data,
      id: (Date.now() + Math.random()).toString(36),
      text: text.substring(0, REMINDER_TEXT_MAX_LENGTH),
    };
    this.reminders$.next([...this.reminders$.getValue(), newItem]);
  }

  public editReminder(data: Reminder) {
    const { text } = data;
    this.reminders$.next(
      this.reminders$.getValue().map(r =>
        r.id === data.id
          ? {
              ...r,
              ...data,
              text: text.substring(0, REMINDER_TEXT_MAX_LENGTH),
            }
          : r,
      ),
    );
  }

  public deleteReminder(reminderId: string): boolean {
    this.reminders$.next(this.reminders$.getValue().filter(r => r.id !== reminderId));
    return true;
  }
}
