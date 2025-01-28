import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [WeatherService, provideHttpClient(withInterceptorsFromDi())],
})
export class WeatherModule {}
