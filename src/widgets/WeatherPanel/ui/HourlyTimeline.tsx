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

  const cardWidth = 96;
  const gap = 16;
  const svgWidth = cardWidth * hourlyData.length + gap * (hourlyData.length - 1);

  const points = useMemo(() => {
    return hourlyData.map((hour, index) => {
      const x = index * (cardWidth + gap) + cardWidth / 2;
      const y = 80 - ((hour.temperature - minTemp) / (maxTemp - minTemp || 1)) * 60;
      return `${x},${y}`;
    }).join(" ");
  }, [hourlyData, minTemp, maxTemp]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-base font-semibold text-black font-pretendard">시간별 현황</div>

      <div className="relative overflow-x-auto">
        {/* 선 그래프 */}
        <svg
          className="absolute top-0 left-0 z-0"
          width={svgWidth}
          height={100}
        >
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={points}
          />
        </svg>

        <div className="flex gap-[16px] z-10 relative pl-2 pr-4" style={{ minWidth: svgWidth }}>
          {hourlyData.map((hour, index) => {
            const dateTime = dayjs(hour.date);
            const hourNumber = dateTime.hour();
            const iconSrc = hourNumber >= 6 && hourNumber < 18 ? WindIcon : WindAfternoonIcon;
            const dotY = 80 - ((hour.temperature - minTemp) / (maxTemp - minTemp || 1)) * 60;

            return (
              <div
                key={hour.date}
                className="flex flex-col items-start p-[12px] px-[24px] flex-shrink-0"
                style={{ width: cardWidth }}
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