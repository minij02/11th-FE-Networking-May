import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '@/entities/weather/api/weatherApi';
import useLocationStore from '@/shared/store/useLocationStore';
import dayjs from 'dayjs';
import { formatTime } from '@/shared/lib/weatherUtils';
import { mockWeatherData } from '@/entities/weather/model/types';
import { useEffect } from 'react';
import { formatTemperature } from '@/shared/lib/weatherUtils';
import MorningSun from '@/assets/icons/sun-morning.png';
import NightSun from '@/assets/icons/sun-night.png';
import MorningClouds from '@/assets/icons/clouds-morning.png';
import NightClouds from '@/assets/icons/clouds-night.png';
import MorningRain from '@/assets/icons/rain-morning.png';
import NightRain from '@/assets/icons/rain-night.png';
import MorningWind from '@/assets/icons/wind-morning.png';
import NightWind from '@/assets/icons/wind-night.png';
import MorningSnow from '@/assets/icons/snow-morning.png';
import NightSnow from '@/assets/icons/snow-night.png';
import MorningLightning from '@/assets/icons/lightning-morning.png';
import NightLightning from '@/assets/icons/lightning-night.png';

export const DailyWeatherCard = () => {
  const { selectedLocation: placeId, locations } = useLocationStore();
  const locationName = locations.find((loc) => loc.id === placeId)?.name ?? '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', placeId],
    queryFn: () => fetchWeather(placeId!),
    enabled: !!placeId,
  });  

  useEffect(() => {
    if (data) {
      console.log('📦 API 응답:', data);
    }
    if (error) {
      console.error('❗ API 오류:', error);
    }
  }, [data, error]);

  const weather = data ?? mockWeatherData;

  const {
    temperature,
    feelsLike,
    humidity,
    windDirection,
    windSpeed,
    uviLevel,
    sunset,
    weatherDescription,
    airPollution,
  } = weather.currentResponse;
  
    const firstHourly = weather.hourlyResponse?.[0];
  const isDaytime = firstHourly
    ? (dayjs(firstHourly.date).hour() >= 6 && dayjs(firstHourly.date).hour() < 18)
    : true;
  const timeLabel = isDaytime ? "주간" : "야간";

  const getWeatherIcon = (description: string, isDaytime: boolean) => {
  const desc = description.toLowerCase();

  if (desc.includes('clear')) {
    return isDaytime ? MorningSun : NightSun;
  }
  if (desc.includes('cloud')) {
    return isDaytime ? MorningClouds : NightClouds;
  }
  if (desc.includes('rain')) {
    return isDaytime ? MorningRain : NightRain;
  }
  if (desc.includes('thunderstorm')) {
    return isDaytime ? MorningLightning : NightLightning;
  }
  if (desc.includes('snow')) {
    return isDaytime ? MorningSnow : NightSnow;
  }

  // 기본 아이콘 (wind)
  return isDaytime ? MorningWind : NightWind;
};

  return (
  <div className="flex w-[1080px] p-8 flex-col items-start gap-3">

  <div className="text-[20px] font-[700] text-black font-pretendard">
    {dayjs().format('M월 D일')} {locationName} 날씨 현황
  </div>

  {/* 이 블록은 세로로 구성됨 */}
  <div className="flex flex-col items-center gap-[10px] p-[10px] self-stretch">
    <div className="flex justify-center items-center gap-[10px]">
      <div className="w-[160px] h-[160px] aspect-square flex justify-center items-center">
        <img src={getWeatherIcon(weatherDescription, isDaytime)} alt="weather icon" className="object-contain w-full h-full" />
      </div>
      <span className="text-[80px] font-[700] font-bold text-[#292E2E] font-pretendard">
        {formatTemperature(temperature)}°
      </span>
    </div>
    <div className="text-center text-gray-500 text-base font-[700] font-medium font-pretendard">
      {timeLabel} / {weatherDescription}
    </div>
    <div className="text-sm text-gray-600 font-[700] font-pretendard">
      체감 {formatTemperature(feelsLike)}° · 습도 {humidity}% · {windDirection}풍 {windSpeed}m/s
    </div>
  </div>

  <div className="flex px-0 py-[12px] justify-center items-start gap-[16px] self-stretch rounded-[16px]">
    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#CCE8FF]">
  <span className="text-sm font-semibold font-[500] text-black font-pretendard">미세먼지</span>
  <span className="text-lg font-bold text-black font-pretendard">{airPollution.pm10Level}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#CEFFCC]">
  <span className="text-sm font-semibold text-black font-[500]font-pretendard">초미세먼지</span>
  <span className="text-lg font-bold text-black font-pretendard">{airPollution.pm2_5Level}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#FFCCCC]">
  <span className="text-sm font-semibold text-black font-[500] font-pretendard">자외선</span>
  <span className="text-lg font-bold text-black font-pretendard">{uviLevel}</span>
</div>

    <div className="flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] bg-[#F6FFCC]">
  <span className="text-sm font-semibold text-black font-[500] font-pretendard">일출</span>
  <span className="text-lg font-bold text-black font-pretendard">{formatTime(sunset)}</span>
</div>
  </div>
</div>
);
};