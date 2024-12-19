import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { ReminderListComponent } from './reminder-list.component';

describe('ReminderListComponent', () => {
  let component: ReminderListComponent;
  let fixture: ComponentFixture<ReminderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [CalendarService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
