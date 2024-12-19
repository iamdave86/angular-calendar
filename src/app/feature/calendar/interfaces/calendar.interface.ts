import { Reminder } from '@feature/reminders/interfaces/reminder.interface';

export interface CalendarDay {
  date: string;
  disabled: boolean;
  weekend?: boolean;
  today?: boolean;
  reminders: Reminder[];
}

export type ColorMap = { [key: string]: string };
