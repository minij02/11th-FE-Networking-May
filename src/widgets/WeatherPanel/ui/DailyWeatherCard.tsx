import { useQuery } from '@tanstack/react-query';
import { fetchDailyWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';

export const DailyWeatherCard = () => {
  const { selectedLocation: placeId } = useLocationStore();
  const date = dayjs().format('YYYY-MM-DD');
  const { data, isLoading } = useQuery({
    queryKey: ['weather', placeId, date],
    queryFn: () => fetchDailyWeather(placeId!, date),
    enabled: !!placeId,
  });  

  if (isLoading || !data) return <div>로딩 중...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-4xl">
      <div className="text-lg font-semibold mb-2">
        {dayjs().format('M월 D일')} {data.location} 날씨 현황
      </div>
      <div className="text-5xl font-bold flex items-center justify-between">
        <img src="/icons/cloudy.png" alt="weather" className="w-20 h-20" />
        <span>{data.temperature}°</span>
      </div>
      <div className="text-center mt-2 text-gray-500">{data.condition}</div>
      <div className="text-sm text-gray-600 mt-2">
        체감 {data.feelsLike}° · 습도 {data.humidity}% · 풍속 {data.windSpeed}m/s
      </div>
      <div className="mt-4 flex justify-around text-sm">
        <span className="bg-blue-200 rounded px-2 py-1">미세먼지 {data.pm10Grade}</span>
        <span className="bg-green-200 rounded px-2 py-1">초미세먼지 {data.pm25Grade}</span>
        <span className="bg-red-200 rounded px-2 py-1">자외선 {data.uvIndex}</span>
        <span className="bg-yellow-200 rounded px-2 py-1">일출 {data.sunrise}</span>
      </div>
    </div>
  );
};