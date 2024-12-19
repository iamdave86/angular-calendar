import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { Weather } from '@feature/weather/interfaces/weather.interface';
import { WeatherService } from '@feature/weather/services/weather.service';
import { ColorMap } from '@feature/calendar/interfaces/calendar.interface';
import {
  ReminderDetailsDialogAfterCloseData,
  ReminderDialogData,
} from '@feature/reminders/interfaces/reminder.interface';

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
    MatProgressSpinner,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [WeatherService],
})
export class ReminderDetailsDialogComponent {
  public colorMap: ColorMap;
  public weatherData$: Observable<Weather>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReminderDialogData,
    private dialogRef: MatDialogRef<ReminderDetailsDialogComponent, ReminderDetailsDialogAfterCloseData>,
    private calendarService: CalendarService,
    private weatherService: WeatherService,
  ) {
    this.colorMap = this.calendarService.getReminderColorMap();
    this.weatherData$ = this.weatherService.getWeatherInformation(this.data.reminder?.city);
  }

  public edit() {
    this.dialogRef.close({ isEdit: true });
  }
}
