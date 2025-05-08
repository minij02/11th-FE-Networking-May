import { useQuery } from '@tanstack/react-query';
import type { HourlyWeather } from '@/entities/weather/model/types';
import { fetchHourlyWeather } from '@/entities/weather/api/weatherApi';
import { usePlaceStore } from '@/shared/store/usePlaceStore';

export const HourlyTimeline = () => {
  const { placeId } = usePlaceStore();
  const { data, isLoading } = useQuery<HourlyWeather[]>({
    queryKey: ['hourlyWeather', placeId],
    queryFn: () => fetchHourlyWeather(placeId),
    enabled: !!placeId,
  });
  
  if (isLoading || !data) return <div>시간별 날씨 로딩 중...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-4xl">
      <div className="text-base font-semibold mb-3">시간별 현황</div>
      <div className="flex overflow-x-auto gap-4">
      {data.map((hour) => (
  <div key={hour.time} className="flex flex-col items-center min-w-[60px]">
    <div className="text-xs">{hour.time}</div>
    <img src={`/icons/${hour.condition}.png`} className="w-6 h-6" />
    <div className="text-sm font-medium">{hour.temp}°</div>
  </div>
))}
      </div>
    </div>
  );
};