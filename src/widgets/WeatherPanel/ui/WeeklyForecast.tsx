import { useQuery } from '@tanstack/react-query';
import type { DailyForecast } from '@/entities/weather/model/types';
import { fetchWeeklyWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';

export const WeeklyForecast = () => {
  const { selectedLocation: placeId } = useLocationStore();
  const { data, isLoading } = useQuery<DailyForecast[]>({
    queryKey: ['weeklyWeather', placeId],
    queryFn: () => fetchWeeklyWeather(placeId!),
    enabled: !!placeId,
  });
  
  if (isLoading || !data) return <div>주간 예보 로딩 중...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-4xl">
      <div className="text-base font-semibold mb-3">주간 예보</div>
      <div className="grid grid-cols-5 gap-3 text-center text-sm">
        {data.map((day) => (
          <div key={day.date} className="flex flex-col items-center">
            <div className="text-xs">{dayjs(day.date).format('dd')}</div>
            <img src={`/icons/${day.morning.condition}.png`} className="w-6 h-6" />
            <div>{day.morning.temp}°</div>
            <div className="text-gray-400">{day.afternoon.temp}°</div>
            <div className="text-blue-400 text-xs">{day.morning.precip}% / {day.afternoon.precip}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};