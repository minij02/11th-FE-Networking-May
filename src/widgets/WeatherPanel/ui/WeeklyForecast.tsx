import { useQuery } from '@tanstack/react-query';
import type { DailyForecast } from '@/entities/weather/model/types';
import { fetchWeeklyWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';
import RainIcon from '@/assets/icons/rain-morning.png'
import RainIconAfternoon from '@/assets/icons/rain-night.png'

export const WeeklyForecast = () => {
  const { selectedLocation: placeId } = useLocationStore();
  const { data, isLoading } = useQuery<DailyForecast[]>({
    queryKey: ['weeklyWeather', placeId],
    queryFn: () => fetchWeeklyWeather(placeId!),
    enabled: !!placeId,
  });

  const daysKr = ['일', '월', '화', '수', '목', '금', '토'];
  
  if (isLoading || !data) return <div>주간 예보 로딩 중...</div>;

  return (
    <div className="w-full">
      <div className="text-base font-semibold mb-3 text-black font-pretendard">주간 예보</div>
      <div className="grid grid-cols-5 gap-4 text-center text-sm">
  {data.map((day, index) => {
    const isToday = index === 0;
    const dayLabel = isToday ? '오늘' : daysKr[dayjs(day.date).day()];

    return (
     <div
        key={day.date}
        className="flex flex-col justify-center items-center gap-2"
      >
        {/* 오전 + 오후 묶음 */}
        <div className="flex justify-center items-center gap-4">
          {/* 오전 카드 */}
          <div className="flex flex-col justify-center items-center gap-[12px] py-[8px]">
            <div className="flex justify-center items-center w-[60px] h-[60px] aspect-square">
              <img src={RainIcon} className="object-contain w-full h-full" alt="오전 날씨" />
            </div>
            <div className="text-sm text-blue-500 font-medium">{day.morning.precip ?? 0}%</div>
            <div className="text-xs text-gray-500 font-semibold">오전</div>
            <div className="text-sm text-black">{day.morning.temp}°</div>
          </div>

          {/* 오후 카드 */}
          <div className="flex flex-col justify-center items-center gap-[12px] py-[8px]">
            <div className="flex justify-center items-center w-[60px] h-[60px] aspect-square">
              <img src={RainIconAfternoon} className="object-contain w-full h-full" alt="오후 날씨" />
            </div>
            <div className="text-sm text-blue-500 font-medium">{day.afternoon.precip ?? 0}%</div>
            <div className="text-xs text-gray-500 font-semibold">오후</div>
            <div className="text-sm text-gray-400">{day.afternoon.temp}°</div>
          </div>
        </div>

        {/* 요일 + 날짜 (하단) */}
        <div className="flex flex-col justify-center items-center gap-2 mt-2">
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