import axios from "axios";
import type {
  LocationRequest,
  LocationResponse,
} from "@/entities/location/model/locationTypes";

// 환경에 따라 withCredentials 설정 분리
const isLocalEnv = import.meta.env.MODE === "development";

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
