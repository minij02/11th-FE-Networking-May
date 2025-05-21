import axios from "axios";
import type {
  LocationRequest,
  LocationResponse,
  LocationItem,
} from "@/entities/location/model/locationTypes";

// 환경에 따라 withCredentials 설정 분리
const isLocalEnv = import.meta.env.MODE === "development";

export const getAllLocations = async (): Promise<LocationItem[]> => {
  const response = await axios.get<{ status: number; data: LocationItem[] }>(
    "/api/v1/places", // 프록시 사용
    {
      headers: {
        Accept: "*/*",
      },
      withCredentials: import.meta.env.MODE === "development",
    }
  );

  return response.data.data;
};

export const addLocation = async (data: LocationRequest): Promise<number> => {
  try {
    const response = await axios.post<LocationResponse>(
      `/api/v1/places`, // 프록시를 통해 호출
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: isLocalEnv, // 로컬 환경에서만 withCredentials 활성화
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Location API Error:", error);
    throw new Error("위치 추가 중 에러가 발생했습니다.");
  }
};

export const togglePinLocation = async (placeId: number): Promise<number> => {
  try {
    const response = await axios.post<{ status: number; data: number }>(
      `/api/v1/places/pin/${placeId}`,
      null // 빈 바디
    );
    return response.data.data;
  } catch (error) {
    console.error("핀 토글 실패:", error);
    throw new Error("위치 핀 상태 변경 중 문제가 발생했습니다.");
  }
};
