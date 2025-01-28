import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { CalendarDay } from '@feature/calendar/interfaces/calendar.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatIconModule],
})
export class CalendarComponent {
  public weekdayNames: string[];
  public calendarDays: CalendarDay[];
  public selectedDate: Date;

  constructor(private calendarService: CalendarService) {
    this.weekdayNames = this.calendarService.getWeekdayNames();
    this.calendarDays = this.calendarService.createCalendarDays();
    this.selectedDate = this.calendarService.getSelectedDate();
  }
}
