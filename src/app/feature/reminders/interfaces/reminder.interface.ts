export enum ReminderColor {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export interface Reminder {
  id: string;
  text: string;
  dateTime: Date;
  color: ReminderColor;
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
