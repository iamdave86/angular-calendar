import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, Observable } from 'rxjs';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { CalendarDay } from '@feature/calendar/interfaces/calendar.interface';
import { Reminder } from '@feature/reminders/interfaces/reminder.interface';
import { ReminderFormDialogComponent } from '@feature/reminders/components/reminder-form-dialog/reminder-form-dialog.component';
import { DIALOG_WIDTH } from '@constants/dialog.constant';
import { RemindersService } from '@feature/reminders/services/reminders.service';
import { ReminderListComponent } from '@feature/reminders/components/reminder-list/reminder-list.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    forwardRef(() => ReminderListComponent),
  ],
})
export class CalendarComponent {
  public weekdayNames: string[];
  public calendarDays$: Observable<CalendarDay[]>;
  public selectedDate$: Observable<Date>;

  constructor(
    private calendarService: CalendarService,
    private remindersService: RemindersService,
    private matDialog: MatDialog,
  ) {
    this.weekdayNames = this.calendarService.getWeekdayNames();
    this.selectedDate$ = this.calendarService.getSelectedDate();
    this.calendarDays$ = combineLatest([this.selectedDate$, this.remindersService.getReminders()]).pipe(
      map(this.calendarService.createCalendarDays),
    );
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

  public openAddReminderDialog(reminder?: Reminder) {
    this.matDialog.open<ReminderFormDialogComponent>(ReminderFormDialogComponent, {
      data: {
        reminder,
      },
      width: DIALOG_WIDTH,
    });
  }
}
