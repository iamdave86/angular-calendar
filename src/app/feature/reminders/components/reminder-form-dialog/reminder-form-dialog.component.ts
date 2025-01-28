import { CommonModule } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { REMINDER_COLOR_MAP, REMINDER_TEXT_MAX_LENGTH } from '@feature/reminders/constants/reminder.constant';
import {
  ReminderColorEnum,
  ReminderColorMap,
  ReminderDialogData,
} from '@feature/reminders/interfaces/reminder.interface';

@Component({
  selector: 'app-reminder-form-dialog',
  templateUrl: './reminder-form-dialog.component.html',
  styleUrls: ['./reminder-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
})
export class ReminderFormDialogComponent {
  public form: FormGroup;
  public colors: ReminderColorEnum[];
  public colorMap: ReminderColorMap;
  public maxTextLength: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReminderDialogData, private formBuilder: FormBuilder) {
    this.form = this.initForm();
    this.colors = Object.values(ReminderColorEnum);
    this.colorMap = REMINDER_COLOR_MAP;
    this.maxTextLength = REMINDER_TEXT_MAX_LENGTH;
  }

  get selectedColor(): ReminderColorEnum {
    return this.form.controls['color'].value as ReminderColorEnum;
  }

  public save() {
    // TODO
  }

  public delete() {
    // TODO
  }

  private initForm(): FormGroup {
    const { text, dateTime, color, city } = this.data.reminder || {
      text: '',
      dateTime: new Date(),
      color: ReminderColorEnum.BLUE,
      city: '',
    };

    return this.formBuilder.group({
      text: [text, [Validators.required, Validators.maxLength(this.maxTextLength)]],
      dateTime: [dateTime, [Validators.required]],
      color: [color, [Validators.required]],
      city: [city],
    });
  }
}
