import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {
  Reminder,
  ReminderColorMap,
  ReminderDetailsDialogAfterCloseData,
} from '@feature/reminders/interfaces/reminder.interface';
import { REMINDER_COLOR_MAP } from '@feature/reminders/constants/reminder.constants';
import { MAX_REMINDERS_TO_RENDER_PER_DAY } from '@feature/calendar/constants/calendar.constants';
import { DIALOG_WIDTH } from '@constants/dialog.constant';
import { ReminderDetailsDialogComponent } from '../reminder-details-dialog/reminder-details-dialog.component';
import { ReminderFormDialogComponent } from '../reminder-form-dialog/reminder-form-dialog.component';
import { AdditionalReminderDialogComponent } from '../additional-reminders-dialog/additional-reminders-dialog.component';

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

  constructor(private matDialog: MatDialog) {
    this.colorMap = REMINDER_COLOR_MAP;
    this.maxRemindersToRenderPerDay = MAX_REMINDERS_TO_RENDER_PER_DAY;
  }

  public openReminderDetails(reminder: Reminder) {
    const detailsDialogRef: MatDialogRef<ReminderDetailsDialogComponent, ReminderDetailsDialogAfterCloseData> =
      this.matDialog.open<ReminderDetailsDialogComponent>(ReminderDetailsDialogComponent, {
        data: {
          reminder,
        },
        width: DIALOG_WIDTH,
      });

    detailsDialogRef.afterClosed().subscribe(result => {
      if (result?.isEdit) {
        this.openReminderForm(reminder);
      }
    });
  }

  public openReminderForm(reminder?: Reminder) {
    this.matDialog.open<ReminderFormDialogComponent>(ReminderFormDialogComponent, {
      data: {
        reminder,
      },
      width: DIALOG_WIDTH,
    });
  }

  public showAdditionalRemindersModal() {
    this.matDialog.open<AdditionalReminderDialogComponent>(AdditionalReminderDialogComponent, {
      data: {
        reminders: this.reminders.slice(this.maxRemindersToRenderPerDay),
      },
      width: DIALOG_WIDTH,
    });
  }
}
