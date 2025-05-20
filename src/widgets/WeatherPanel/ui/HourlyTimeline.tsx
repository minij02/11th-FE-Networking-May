import { useQuery } from "@tanstack/react-query";
import type { HourlyWeather } from "@/entities/weather/model/types";
import { fetchWeather } from "@/entities/weather/api/weatherApi";
import useLocationStore from "@/shared/store/useLocationStore";
import WindIcon from "@/assets/icons/wind-morning.png";
import WindAfternoonIcon from "@/assets/icons/wind-night.png";
import dayjs from "dayjs";
import { useMemo } from "react";
import { mockWeatherData } from "@/entities/weather/model/types";

export const HourlyTimeline = () => {
  const { selectedLocation: placeId } = useLocationStore();

  const { data, isLoading } = useQuery({
    queryKey: ['weather', placeId],
    queryFn: () => fetchWeather(placeId!),
    enabled: !!placeId,
  });  

  const hourlyData: HourlyWeather[] = data?.hourlyResponse ?? mockWeatherData.hourlyResponse;

  const temps = hourlyData.map((d) => d.temperature);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

 const points = useMemo(() => {
    return hourlyData
      .map((hour, index) => {
        const x = index * 96 + 48;
        const y = 80 - ((hour.temperature - minTemp) / (maxTemp - minTemp || 1)) * 60;
        return `${x},${y}`;
      })
      .join(" ");
  }, [hourlyData, minTemp, maxTemp]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-base font-semibold text-black font-pretendard">
        시간별 현황
      </div>

      <div className="relative overflow-x-auto">
        {/* 선 그래프 */}
        <svg
          className="absolute left-0 top-0 z-0"
          width={hourlyData.length * 96}
          height={100}
        >
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={points}
          />
        </svg>

        <div className="flex gap-4 z-10 relative pl-2">
           {hourlyData.map((hour, index) => {
            const dateTime = dayjs(hour.date); // ⬅ ISO 형식의 문자열
            const hourNumber = dateTime.hour();
            const iconSrc = hourNumber >= 6 && hourNumber < 18 ? WindIcon : WindAfternoonIcon;
            const dotY =
              80 - ((hour.temperature - minTemp) / (maxTemp - minTemp || 1)) * 60;

            return (
              <div
                key={hour.date}
                className="flex flex-col items-start p-[12px] px-[24px] flex-shrink-0"
                style={{ width: 96 }}
              >
                <div className="flex flex-col items-center gap-[8px] relative">
                  {/* 점 */}
                  <div
                    className="w-2 h-2 rounded-full bg-blue-500 absolute"
                    style={{ top: `${dotY}px` }}
                  />
                  {/* 아이콘 */}
                  <div className="w-[40px] h-[40px] aspect-square flex justify-center items-center mt-[20px]">
                    <img
                      src={iconSrc}
                      alt="날씨 아이콘"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* 시간 */}
                  <div className="text-xs text-gray-700">
                    {dateTime.format("HH시")}
                  </div>
                  {/* 온도 */}
                  <div className="text-sm font-medium text-black">
                    {hour.temperature}°
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
