import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { ReminderColorEnum, Reminder } from '@feature/reminders/interfaces/reminder.interface';
import { WeatherService } from '@feature/weather/services/weather.service';
import { ReminderDetailsDialogComponent } from './reminder-details-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReminderDetailsDialogComponent', () => {
  let component: ReminderDetailsDialogComponent;
  let fixture: ComponentFixture<ReminderDetailsDialogComponent>;
  const mockReminder: Reminder = {
    id: 'id',
    text: 'reminder',
    dateTime: new Date('Mon Jan 31 2022 10:00:00 GMT+0100 (Central European Standard Time'),
    color: ReminderColorEnum.GREEN,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatDialogModule],
      providers: [
        CalendarService,
        WeatherService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            reminder: mockReminder,
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
