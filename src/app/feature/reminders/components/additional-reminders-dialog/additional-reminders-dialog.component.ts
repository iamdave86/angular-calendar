import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ReminderListDialogData } from '@feature/reminders/interfaces/reminder.interface';
import { ReminderListComponent } from '../reminder-list/reminder-list.component';

@Component({
  selector: 'app-additional-reminders-dialog',
  templateUrl: './additional-reminders-dialog.component.html',
  styleUrls: ['./additional-reminders-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatDialogModule, MatButtonModule, forwardRef(() => ReminderListComponent)],
})
export class AdditionalReminderDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReminderListDialogData,
    private dialogRef: MatDialogRef<AdditionalReminderDialogComponent>,
  ) {}

  public clickReminderItem() {
    this.dialogRef.close();
  }
}
