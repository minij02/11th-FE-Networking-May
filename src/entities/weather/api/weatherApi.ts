import axios from "axios";
import type { CombinedWeatherResponse } from "../model/types";

const BASE_URL = "/api/v1/places";

export const fetchWeather = async (
  placeId: number
): Promise<CombinedWeatherResponse> => {
  const response = await axios.get(`${BASE_URL}/${placeId}/weather`);
  return response.data.data; // 백엔드 응답은 { status, data } 구조
};
