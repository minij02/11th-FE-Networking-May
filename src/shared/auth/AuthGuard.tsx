import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherPanel } from "@/widgets/WeatherPanel";

export const AuthGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get("/api/v1/places/{placeId}/weather", { withCredentials: true }) // 아무 보호된 API
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>로딩 중...</div>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-gray-700">로그인이 필요합니다</p>
        <button
          onClick={() =>
            (window.location.href =
              "http://ec2-43-203-7-170.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google")
          }
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Google 로그인
        </button>
      </div>
    );
  }

  return <WeatherPanel />;
};