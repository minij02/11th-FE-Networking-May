export interface AirPollution {
  pm10Level: string;
  pm2_5Level: string;
}

export interface CurrentResponse {
  date: string;
  weatherDescription: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windDirection: string;
  sunset: string;
  uviLevel: string;
  windSpeed: number;
  airPollution: AirPollution;
  airPollutionResponse?: AirPollution; // optional 처리 (백엔드 중복 방지)
}

export interface DailyForecast {
  date: string;
  weatherDescription: string;
  dayTemperature: number;
  eveTemperature: number;
  humidity: number;
}

export interface HourlyWeather {
  date: string; // ISO format
  weatherDescription: string;
  temperature: number;
}

export interface CombinedWeatherResponse {
  currentResponse: CurrentResponse;
  dailyResponse: DailyForecast[];
  hourlyResponse: HourlyWeather[];
}

export const mockWeatherData: CombinedWeatherResponse = {
  currentResponse: {
    date: '2025-05-20',
    weatherDescription: '흐림',
    temperature: 26.5,
    feelsLike: 27.2,
    humidity: 68,
    windDirection: '북동',
    windSpeed: 2.1,
    sunset: '2025-05-20T19:34:00',
    uviLevel: '보통',
    airPollution: {
      pm10Level: '좋음',
      pm2_5Level: '보통',
    },
    airPollutionResponse: {
      pm10Level: '좋음',
      pm2_5Level: '보통',
    },
  },
  dailyResponse: [
    {
      date: '2025-05-20',
      weatherDescription: 'cloudy',
      dayTemperature: 20.4,
      eveTemperature: 18.5,
      humidity: 65,
    },
    {
      date: '2025-05-21',
      weatherDescription: 'clear sky',
      dayTemperature: 22.4,
      eveTemperature: 18.2,
      humidity: 60,
    },
    {
      date: '2025-05-22',
      weatherDescription: 'rain',
      dayTemperature: 19.1,
      eveTemperature: 17.8,
      humidity: 80,
    },
    {
      date: '2025-05-23',
      weatherDescription: 'cloudy',
      dayTemperature: 21.3,
      eveTemperature: 18.7,
      humidity: 72,
    },
    {
      date: '2025-05-24',
      weatherDescription: 'clear sky',
      dayTemperature: 24.6,
      eveTemperature: 20.1,
      humidity: 55,
    },
  ],
  hourlyResponse: [
    { date: '2025-05-20T06:00', weatherDescription: 'cloudy', temperature: 16.4 },
    { date: '2025-05-20T07:00', weatherDescription: 'cloudy', temperature: 17.2 },
    { date: '2025-05-20T08:00', weatherDescription: 'cloudy', temperature: 18.0 },
    { date: '2025-05-20T09:00', weatherDescription: 'clear sky', temperature: 18.4 },
    { date: '2025-05-20T10:00', weatherDescription: 'clear sky', temperature: 19.2 },
    { date: '2025-05-20T11:00', weatherDescription: 'clear sky', temperature: 20.1 },
    { date: '2025-05-20T12:00', weatherDescription: 'clear sky', temperature: 21.0 },
    { date: '2025-05-20T13:00', weatherDescription: 'clear sky', temperature: 21.5 },
    { date: '2025-05-20T14:00', weatherDescription: 'clear sky', temperature: 22.2 },
    { date: '2025-05-20T15:00', weatherDescription: 'cloudy', temperature: 21.9 },
    { date: '2025-05-20T16:00', weatherDescription: 'cloudy', temperature: 21.1 },
    { date: '2025-05-20T17:00', weatherDescription: 'cloudy', temperature: 20.2 },
    { date: '2025-05-20T18:00', weatherDescription: 'overcast clouds', temperature: 19.4 },
    { date: '2025-05-20T19:00', weatherDescription: 'overcast clouds', temperature: 18.3 },
  ],
};