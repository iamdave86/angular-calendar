import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { RemindersService } from '@feature/reminders/services/reminders.service';

const mockDateTime = new Date('Mon Jan 31 2022 10:00:00 GMT+0100 (Central European Standard Time');

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService, RemindersService],
    });
    service = TestBed.inject(CalendarService);

    spyOn(Math, 'random').and.returnValues(0.1, 0.2);
    spyOn(Date, 'now').and.returnValues(mockDateTime.getTime());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
