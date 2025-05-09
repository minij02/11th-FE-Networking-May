import axios from 'axios';

const BASE_URL = '/api/v1/places';

export const fetchDailyWeather = (placeId: string, date: string) =>
  axios.get(`${BASE_URL}/${placeId}/weather/date`, { params: { date } }).then(res => res.data);

export const fetchHourlyWeather = (placeId: string) =>
  axios.get(`${BASE_URL}/${placeId}/weather/hourly`).then(res => res.data);

export const fetchWeeklyWeather = (placeId: string) =>
  axios.get(`${BASE_URL}/${placeId}/weather/weekly`).then(res => res.data);