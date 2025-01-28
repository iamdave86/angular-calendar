import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Reminder, ReminderColorMap } from '@feature/reminders/interfaces/reminder.interface';
import { REMINDER_COLOR_MAP } from '@feature/reminders/constants/reminder.constants';
import { MAX_REMINDERS_TO_RENDER_PER_DAY } from '@feature/calendar/constants/calendar.constants';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class ReminderListComponent {
  @Input() public reminders: Reminder[] = [];
  @Input() public isAdditional: boolean = false;
  @Output() public clickReminderItem: EventEmitter<null> = new EventEmitter<null>();

  public readonly colorMap: ReminderColorMap;
  public readonly maxRemindersToRenderPerDay: number;

  constructor() {
    this.colorMap = REMINDER_COLOR_MAP;
    this.maxRemindersToRenderPerDay = MAX_REMINDERS_TO_RENDER_PER_DAY;
  }
}
