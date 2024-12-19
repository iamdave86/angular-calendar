import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DIALOG_WIDTH } from '@constants/dialog.constant';
import { ReminderFormDialogComponent } from '@feature/reminders/components/reminder-form-dialog/reminder-form-dialog.component';
import { Reminder } from '@feature/reminders/interfaces/reminder.interface';
import { CalendarDay } from '@feature/calendar/interfaces/calendar.interface';
import { CalendarService } from '@feature/calendar/services/calendar.service';
import { ReminderListComponent } from '@feature/reminders/components/reminder-list/reminder-list.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    forwardRef(() => ReminderListComponent),
  ],
})
export class CalendarComponent {
  public selectedDate$: Observable<Date>;
  public dayNamesOfWeek: string[];
  public calendarDays$: Observable<CalendarDay[]>;

  constructor(private calendarService: CalendarService, private matDialog: MatDialog) {
    this.selectedDate$ = this.calendarService.getSelectedDate();
    this.dayNamesOfWeek = this.calendarService.getDayNamesOfWeek();
    this.calendarDays$ = combineLatest([this.selectedDate$, this.calendarService.getReminders()]).pipe(
      map(this.calendarService.createCalendarDays),
    );
  }

  public openReminderForm(reminder?: Reminder) {
    this.matDialog.open<ReminderFormDialogComponent>(ReminderFormDialogComponent, {
      data: {
        reminder,
      },
      width: DIALOG_WIDTH,
    });
  }

  public prevMonth() {
    this.calendarService.prevMonth();
  }

  public nextMonth() {
    this.calendarService.nextMonth();
  }

  public today() {
    this.calendarService.today();
  }
}
