import { TestBed } from '@angular/core/testing';

import { REMINDER_TEXT_MAX_LENGTH } from '@feature/reminders/constants/reminder.constants';
import { RemindersService } from './reminders.service';
import { Reminder, ReminderColorEnum } from '../interfaces/reminder.interface';

const mockNewReminderId = 'kz2go800.3lq';
const mockDateTime = new Date('Mon Jan 31 2022 10:00:00 GMT+0100 (Central European Standard Time');
const mockReminderToAdd: Omit<Reminder, 'id'> = {
  text: 'reminder test',
  dateTime: mockDateTime,
  color: ReminderColorEnum.GREEN,
};
const mockAddedReminder = {
  ...mockReminderToAdd,
  id: mockNewReminderId,
};

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemindersService],
    });
    service = TestBed.inject(RemindersService);

    spyOn(Math, 'random').and.returnValues(0.1, 0.2);
    spyOn(Date, 'now').and.returnValues(mockDateTime.getTime());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createReminder', () => {
    it(`should not trim text if less than ${REMINDER_TEXT_MAX_LENGTH} characters`, done => {
      service.createReminder(mockReminderToAdd);
      service.getReminders().subscribe(reminders => {
        expect(reminders.length).toEqual(1);
        expect(reminders[0]).toEqual(mockAddedReminder);
        expect(reminders[0].text).toEqual('reminder test');
        done();
      });
    });

    it(`should trim text if longer than ${REMINDER_TEXT_MAX_LENGTH} characters`, done => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      const trimmedLongText = 'Lorem ipsum dolor sit amet, co';
      service.createReminder({ ...mockReminderToAdd, text: longText });
      service.getReminders().subscribe(reminders => {
        expect(reminders.length).toEqual(1);
        expect(reminders[0]).toEqual({ ...mockAddedReminder, text: trimmedLongText });
        expect(reminders[0].text).toEqual(trimmedLongText);
        done();
      });
    });
  });

  describe('editReminder', () => {
    it('should edit', done => {
      const editedText = 'reminder test edited';
      const editedColor = ReminderColorEnum.RED;
      const editedCity = 'city';
      service.createReminder(mockReminderToAdd);
      service.editReminder({ ...mockAddedReminder, text: editedText, color: editedColor, city: editedCity });
      service.getReminders().subscribe(reminders => {
        expect(reminders[0].text).toEqual(editedText);
        expect(reminders[0].color).toEqual(editedColor);
        expect(reminders[0].city).toEqual(editedCity);
        done();
      });
    });

    it(`should trim text if longer than ${REMINDER_TEXT_MAX_LENGTH} characters`, done => {
      const editedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      const trimmedText = 'Lorem ipsum dolor sit amet, co';
      service.createReminder(mockReminderToAdd);
      service.editReminder({ ...mockAddedReminder, text: editedText });
      service.getReminders().subscribe(reminders => {
        expect(reminders[0].text).toEqual(trimmedText);
        done();
      });
    });

    it('should not update fields than has not been updated', done => {
      const editedText = 'reminder test edited';
      service.createReminder(mockReminderToAdd);
      service.editReminder({ ...mockAddedReminder, text: editedText });
      service.getReminders().subscribe(reminders => {
        expect(reminders[0].text).toEqual(editedText);
        expect(reminders[0].color).toEqual(ReminderColorEnum.GREEN);
        expect(reminders[0].dateTime).toEqual(mockDateTime);
        expect(reminders[0].city).toEqual(undefined);
        done();
      });
    });
  });

  it('deleteReminder', done => {
    service.createReminder(mockReminderToAdd);
    service.deleteReminder(mockNewReminderId);
    service.getReminders().subscribe(reminders => {
      expect(reminders.length).toEqual(0);
      done();
    });
  });
});
