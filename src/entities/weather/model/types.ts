export type HourlyWeather = {
    time: string;
    condition: string;
    temp: number;
  };  

  export type DailyForecast = {
    date: string;
    morning: {
      temp: number;
      precip: number;
      condition: string;
    };
    afternoon: {
      temp: number;
      precip: number;
      condition: string;
    };
  };