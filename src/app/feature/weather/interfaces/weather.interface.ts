export interface WeatherApiResponse {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: { feels_like: number; humidity: number; pressure: number; temp: number; temp_max: number; temp_min: number };
  name: string;
  sys: { country: string; id: number; sunrise: number; sunset: number; type: number };
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: { deg: number; gust: number; speed: number };
}

interface WeatherData {
  description: string;
  icon: string;
  temperature: {
    actual: number;
    feelsLike: number;
    min: number;
    max: number;
  };
}

export type Weather = WeatherData | null | undefined;
