import axios from 'axios';
import { mockDailyWeather } from '../model/types';
import { mockWeeklyWeather} from '../model/types'
import { mockHourlyWeather } from '../model/types';
import type { WeatherData } from '../model/types';
import type { DailyForecast } from '../model/types';
import type { HourlyWeather } from '../model/types';

const BASE_URL = '/api/v1/places';

export const fetchDailyWeather = async (placeId: string, date: string): Promise<WeatherData> => {
  // 실제 API 요청
  // return axios
  //   .get(`${BASE_URL}/${placeId}/weather/date`, { params: { date } })
  //   .then(res => res.data);

  // 목데이터 반환
  return Promise.resolve(mockDailyWeather);
};

export const fetchHourlyWeather = async (
  placeId: string
): Promise<HourlyWeather[]> => {
  // 실제 API 요청
  // return axios
  //   .get(`${BASE_URL}/${placeId}/weather/hourly`)
  //   .then(res => res.data);

  return Promise.resolve(mockHourlyWeather);
};

export const fetchWeeklyWeather = async (
  placeId: string
): Promise<DailyForecast[]> => {
  // 실제 API 요청
  // return axios
  //   .get(`${BASE_URL}/${placeId}/weather/weekly`)
  //   .then(res => res.data);

  // 목데이터 반환
  return Promise.resolve(mockWeeklyWeather);
};