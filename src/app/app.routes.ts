import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calendar',
    loadComponent: () =>
      import('@feature/calendar/components/calendar/calendar.component').then(c => c.CalendarComponent),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: '**', redirectTo: '/calendar' },
];
