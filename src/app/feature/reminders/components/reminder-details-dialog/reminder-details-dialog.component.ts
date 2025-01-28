import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReminderColorMap, ReminderDialogData } from '@feature/reminders/interfaces/reminder.interface';
import { REMINDER_COLOR_MAP } from '@feature/reminders/constants/reminder.constants';

@Component({
  selector: 'app-reminder-details-dialog',
  templateUrl: './reminder-details-dialog.component.html',
  styleUrls: ['./reminder-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class ReminderDetailsDialogComponent {
  public colorMap: ReminderColorMap;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReminderDialogData) {
    this.colorMap = REMINDER_COLOR_MAP;
  }
}
