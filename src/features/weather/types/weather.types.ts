export type CurrentWeather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    weather_code: string;
    wind_speed_10m: string;
    is_day: string;
    surface_pressure: string;
    visibility: string;
    cloud_cover: string;
    precipitation: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
    surface_pressure: number;
    visibility: number;
    cloud_cover: number;
    precipitation: number;
  };
};
