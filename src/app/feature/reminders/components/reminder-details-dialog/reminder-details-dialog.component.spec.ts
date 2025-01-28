import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ReminderDetailsDialogComponent } from './reminder-details-dialog.component';

describe('ReminderDetailsDialogComponent', () => {
  let component: ReminderDetailsDialogComponent;
  let fixture: ComponentFixture<ReminderDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
