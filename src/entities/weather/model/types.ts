export type HourlyWeather = {
  time: string;
  condition: string;
  temp: number;
};
export interface RawHourlyWeather {
  dt: number; // UNIX timestamp
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

  export type DailyForecast = {
    date: string;
    morning: {
      temp: number;
      precip?: number;
      condition: string;
    };
    afternoon: {
      temp: number;
      precip?: number;
      condition: string;
    };
  };

  export interface WeatherData {
  location: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    uvi: number;
    sunrise: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  pm10Grade: string;
  pm25Grade: string;
};

export const mockHourlyWeather: HourlyWeather[] = [
  {
    time: '10:00',
    condition: '04n', // 아이콘 이름
    temp: 18.9,
  },
  {
    time: '11:00',
    condition: '04n',
    temp: 19.1,
  },
  {
    time: '12:00',
    condition: '01d',
    temp: 20.4,
  },
  {
    time: '13:00',
    condition: '01d',
    temp: 21.2,
  },
  {
    time: '14:00',
    condition: '01d',
    temp: 22.6,
  },
  {
    time: '15:00',
    condition: '01d',
    temp: 23.1,
  },
  {
    time: '16:00',
    condition: '02d',
    temp: 22.7,
  },
  {
    time: '17:00',
    condition: '03d',
    temp: 21.5,
  },
  {
    time: '18:00',
    condition: '03d',
    temp: 20.4,
  },
  {
    time: '19:00',
    condition: '03d',
    temp: 19.2,
  },
  {
    time: '20:00',
    condition: '04n',
    temp: 17.6,
  },
  {
    time: '21:00',
    condition: '04n',
    temp: 16.4,
  },
];

export const mockRawHourlyWeather: RawHourlyWeather[] = [
  {
    dt: 1684926000, // 10:00
    temp: 292.01,
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04n',
      },
    ],
  },
  {
    dt: 1684929600, // 11:00
    temp: 293.12,
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
  },
  {
    dt: 1684933200, // 12:00
    temp: 294.23,
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
  },
  // ...추가
];

export const mockDailyWeather: WeatherData = {
  location: '롯데월드',
  current: {
    temp: 285.15,
    feels_like: 284.3,
    humidity: 68,
    wind_speed: 2.1,
    uvi: 1.2,
    sunrise: 1684926645,
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: '부분적으로 흐림',
        icon: 'clouds-afternoon',
      },
    ],
  },
  pm10Grade: '좋음',
  pm25Grade: '보통',
};

export const mockWeeklyWeather: DailyForecast[] = [
  {
    date: '2025-05-12',
    morning: {
      temp: 18.16,
      condition: 'clear sky',
    },
    afternoon: {
      temp: 22.48,
      condition: 'clear sky',
    },
  },
  {
    date: '2025-05-13',
    morning: {
      temp: 24.1,
      condition: 'overcast clouds',
    },
    afternoon: {
      temp: 22.42,
      condition: 'overcast clouds',
    },
  },
  {
    date: '2025-05-14',
    morning: {
      temp: 25.28,
      condition: 'clear sky',
    },
    afternoon: {
      temp: 22.26,
      condition: 'clear sky',
    },
  },
  {
    date: '2025-05-15',
    morning: {
      temp: 19.2,
      condition: 'overcast clouds',
    },
    afternoon: {
      temp: 19.51,
      condition: 'overcast clouds',
    },
  },
  {
    date: '2025-05-16',
    morning: {
      temp: 23.01,
      condition: 'overcast clouds',
    },
    afternoon: {
      temp: 21.96,
      condition: 'overcast clouds',
    },
  },
];