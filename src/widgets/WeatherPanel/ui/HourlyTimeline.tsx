import { useQuery } from '@tanstack/react-query';
import type { HourlyWeather } from '@/entities/weather/model/types';
import { fetchHourlyWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import WindIcon from '@/assets/icons/wind-morning.png';
import WindAfternoonIcon from '@/assets/icons/wind-night.png';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const HourlyTimeline = () => {
  const { selectedLocation: placeId } = useLocationStore();

  const { data, isLoading } = useQuery<HourlyWeather[]>({
    queryKey: ['hourlyWeather', placeId],
    queryFn: () => fetchHourlyWeather(placeId!),
    enabled: !!placeId,
  });

  const temps = data?.map((d) => d.temp) ?? [];
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const points = useMemo(() => {
    if (!data) return '';
    return data.map((hour, index) => {
      const x = index * 96 + 48; // 가운데 정렬
      const y = 80 - ((hour.temp - minTemp) / (maxTemp - minTemp || 1)) * 60;
      return `${x},${y}`;
    }).join(' ');
  }, [data, minTemp, maxTemp]);

  if (isLoading || !data) return <div>시간별 날씨 로딩 중...</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-base font-semibold text-black font-pretendard">시간별 현황</div>

      <div className="relative overflow-x-auto">
        {/* 선 그래프 */}
        <svg
          className="absolute left-0 top-0 z-0"
          width={data.length * 96}
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
          {data.map((hour, index) => {
            const baseDate = dayjs().format('YYYY-MM-DD');
            const dateTime = dayjs(`${baseDate} ${hour.time}`);
            const hourNumber = dateTime.hour();
            const iconSrc = hourNumber >= 6 && hourNumber < 18 ? WindIcon : WindAfternoonIcon;
            const dotY = 80 - ((hour.temp - minTemp) / (maxTemp - minTemp || 1)) * 60;

            return (
              <div
                key={hour.time}
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
                    {dateTime.isValid() ? dateTime.format('HH시') : hour.time}
                  </div>
                  {/* 온도 */}
                  <div className="text-sm font-medium text-black">{hour.temp}°</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};