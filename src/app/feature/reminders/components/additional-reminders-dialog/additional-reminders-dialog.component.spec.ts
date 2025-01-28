import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { AdditionalReminderDialogComponent } from './additional-reminders-dialog.component';
import { Reminder, ReminderColorEnum } from '@feature/reminders/interfaces/reminder.interface';

describe('AdditionalReminderDialogComponent', () => {
  let component: AdditionalReminderDialogComponent;
  let fixture: ComponentFixture<AdditionalReminderDialogComponent>;
  const mockReminder: Reminder = {
    id: 'id',
    text: 'reminder',
    dateTime: new Date('Mon Jan 31 2022 10:00:00 GMT+0100 (Central European Standard Time'),
    color: ReminderColorEnum.GREEN,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        CalendarService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            reminders: [mockReminder],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
