import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import type { Weather, WeatherApiResponse } from '../interfaces/weather.interface';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;

  constructor(private http: HttpClient) {
    this.apiKey = environment.openWeatherApiKey;
  }

  public getWeatherInformation(city?: string): Observable<Weather> {
    if (!city) {
      return of(undefined);
    }

    return this.callApi(city).pipe(
      map(response => this.parseWeatherResponse(response)),
      catchError(() => of(undefined)),
    );
  }

  private callApi(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get<WeatherApiResponse>(apiUrl);
  }

  private parseWeatherResponse = (response: WeatherApiResponse): Weather => {
    const {
      main: { temp, feels_like, temp_max, temp_min },
      weather,
    } = response;

    return {
      description: weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weather[0].icon}.png`,
      temperature: {
        actual: temp,
        feelsLike: feels_like,
        min: temp_min,
        max: temp_max,
      },
    };
  };
}
