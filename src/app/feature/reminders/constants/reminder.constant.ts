import { ReminderColorEnum, ReminderColorMap } from '../interfaces/reminder.interface';

export const REMINDER_TEXT_MAX_LENGTH = 30;

export const REMINDER_COLOR_MAP: ReminderColorMap = {
  [ReminderColorEnum.RED]: '#D50001',
  [ReminderColorEnum.GREEN]: '#0A8043',
  [ReminderColorEnum.BLUE]: '#039BE5',
  [ReminderColorEnum.YELLOW]: '#F5BF25',
};
