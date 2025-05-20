import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';
import { kelvinToCelsius, formatTime } from '@/shared/lib/weatherUtils';
import { mockWeatherData } from '@/entities/weather/model/types';
import CloudsAfternoonIcon from '@/assets/icons/clouds-night.png';

export const DailyWeatherCard = () => {
  const { selectedLocation: placeId } = useLocationStore();

  const { data, isLoading } = useQuery({
    queryKey: ['weather', placeId],
    queryFn: () => fetchWeather(placeId!),
    enabled: !!placeId,
  });  

  const weather = data ?? mockWeatherData;
  const {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    uviLevel,
    sunset,
    weatherDescription,
    airPollution,
  } = weather.currentResponse;
  
  return (
  <div className="flex w-[1080px] p-8 flex-col items-start gap-3">

  <div className="text-[20px] font-bold text-black font-pretendard">
    {dayjs().format('M월 D일')} 날씨 현황
  </div>

  {/* 이 블록은 세로로 구성됨 */}
  <div className="flex flex-col items-center gap-[10px] p-[10px] self-stretch">
    <div className="flex justify-center items-center gap-[10px]">
      <div className="w-[160px] h-[160px] aspect-square flex justify-center items-center">
        <img src={CloudsAfternoonIcon} alt="weather icon" className="object-contain w-full h-full" />
      </div>
      <span className="text-[80px] font-bold text-[#292E2E] font-pretendard">
        {kelvinToCelsius(temperature)}°
      </span>
    </div>
    <div className="text-center text-gray-500 text-base font-medium font-pretendard">
      {weatherDescription}
    </div>
    <div className="text-sm text-gray-600 font-pretendard">
      체감 {kelvinToCelsius(feelsLike)}° · 습도 {humidity}% · 풍속 {windSpeed}m/s
    </div>
  </div>

  <div className="mt-4 flex justify-around w-full text-sm font-medium text-white gap-2">
    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#CCE8FF]">
  <span className="text-sm font-semibold text-black font-pretendard">미세먼지</span>
  <span className="text-lg font-bold text-black font-pretendard">{airPollution.pm10Level}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#CEFFCC]">
  <span className="text-sm font-semibold text-black font-pretendard">초미세먼지</span>
  <span className="text-lg font-bold text-black font-pretendard">{airPollution.pm2_5Level}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#FFCCCC]">
  <span className="text-sm font-semibold text-black font-pretendard">자외선</span>
  <span className="text-lg font-bold text-black font-pretendard">{uviLevel}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#F6FFCC]">
  <span className="text-sm font-semibold text-black font-pretendard">일출</span>
  <span className="text-lg font-bold text-black font-pretendard">{formatTime(sunset)}</span>
</div>
  </div>
</div>
);
};