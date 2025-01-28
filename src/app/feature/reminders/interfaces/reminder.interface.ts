export enum ReminderColorEnum {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export type ReminderColorMap = { [key in keyof typeof ReminderColorEnum]: string };

export interface Reminder {
  id: string;
  text: string;
  dateTime: Date;
  color: ReminderColorEnum;
  city?: string;
}

export interface ReminderDialogData {
  reminder: Reminder;
}

export interface ReminderListDialogData {
  reminders: Reminder[];
}

export interface ReminderDetailsDialogAfterCloseData {
  isEdit?: boolean;
}
