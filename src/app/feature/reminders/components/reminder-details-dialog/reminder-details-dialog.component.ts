import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  ReminderColorMap,
  ReminderDetailsDialogAfterCloseData,
  ReminderDialogData,
} from '@feature/reminders/interfaces/reminder.interface';
import { REMINDER_COLOR_MAP } from '@feature/reminders/constants/reminder.constants';
import { WeatherService } from '@feature/weather/services/weather.service';
import { Observable } from 'rxjs';
import { Weather } from '@feature/weather/interfaces/weather.interface';

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
    MatProgressSpinnerModule,
  ],
  providers: [WeatherService],
})
export class ReminderDetailsDialogComponent {
  public colorMap: ReminderColorMap;
  public weatherData$: Observable<Weather>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData,
    private dialogRef: MatDialogRef<ReminderDetailsDialogComponent, ReminderDetailsDialogAfterCloseData>,
    private weatherService: WeatherService,
  ) {
    this.colorMap = REMINDER_COLOR_MAP;
    this.weatherData$ = this.weatherService.getWeatherInformation(this.data.reminder?.city);
  }

  public edit() {
    this.dialogRef.close({ isEdit: true });
  }
}
