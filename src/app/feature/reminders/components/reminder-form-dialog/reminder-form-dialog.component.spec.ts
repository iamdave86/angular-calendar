import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalendarService } from '@feature/calendar/services/calendar.service';
import { ReminderFormDialogComponent } from './reminder-form-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReminderFormComponent', () => {
  let component: ReminderFormDialogComponent;
  let fixture: ComponentFixture<ReminderFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, NoopAnimationsModule],
      providers: [
        CalendarService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
