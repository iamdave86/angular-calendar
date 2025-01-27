import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CalendarService } from '@feature/calendar/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  constructor(private calendarService: CalendarService) {}
}
