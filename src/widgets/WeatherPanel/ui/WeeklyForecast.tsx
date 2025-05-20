import { useQuery } from '@tanstack/react-query';
import type { DailyForecast } from '@/entities/weather/model/types';
import { fetchWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';
import RainIcon from '@/assets/icons/rain-morning.png'; // 전체 날씨 아이콘으로 사용
import SunIcon from '@/assets/icons/sun-morning.png'; // 조건부 변경 가능
import { mockWeatherData } from '@/entities/weather/model/types';
import { formatTemperature } from '@/shared/lib/weatherUtils';

export const WeeklyForecast = () => {
  const { selectedLocation: placeId } = useLocationStore();

  const { data, isLoading } = useQuery({
    queryKey: ['weather', placeId],
    queryFn: () => fetchWeather(placeId!),
    enabled: !!placeId,
  });

  const daysKr = ['일', '월', '화', '수', '목', '금', '토'];
  
   const weeklyData: DailyForecast[] =
    data?.dailyResponse ?? mockWeatherData.dailyResponse;

  return (
    <div className="w-full">
      <div className="text-[20px] font-[700] text-black font-pretendard">주간 예보</div>
      <div className="grid grid-cols-5 gap-4">
        {weeklyData.map((day, index) => {
          const isToday = index === 0;
          const dayLabel = isToday ? '오늘' : daysKr[dayjs(day.date).day()];

          return (
            <div
              key={day.date}
              className="flex flex-col justify-center items-center gap-2"
            >
              {/* 대표 아이콘 + 습도 */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-[40px] h-[40px] aspect-square flex justify-center items-center">
                  <img
                    src={RainIcon} // weatherDescription에 따라 조건부로 아이콘 변경 가능
                    alt="날씨 아이콘"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="text-xs text-gray-500">{day.humidity}%</div>
              </div>

              {/* 오전 + 오후 온도 */}
              <div className="flex justify-center items-center gap-4">
                {/* 오전 */}
                <div className="flex flex-col justify-center items-center gap-[6px] py-[6px]">
                  <div className="text-xs text-gray-500 font-semibold">오전</div>
                  <div className="text-sm text-black font-medium">{formatTemperature(day.dayTemperature)}°</div>
                </div>
                {/* 오후 */}
                <div className="flex flex-col justify-center items-center gap-[6px] py-[6px]">
                  <div className="text-xs text-gray-500 font-semibold">오후</div>
                  <div className="text-sm text-gray-400 font-medium">{formatTemperature(day.eveTemperature)}°</div>
                </div>
              </div>

              {/* 요일/날짜 */}
              <div className="flex flex-col justify-center items-center gap-1 mt-1">
                <div className="text-xs font-bold text-[#1C1C1C]">{dayLabel}</div>
                <div className="text-sm font-medium text-gray-600">{dayjs(day.date).format('M.D')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};