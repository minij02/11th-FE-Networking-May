import { DailyWeatherCard } from './ui/DailyWeatherCard';
import { HourlyTimeline } from './ui/HourlyTimeline';
import { WeeklyForecast } from './ui/WeeklyForecast';
import useLocationStore from '@/shared/store/useLocationStore';
import CloudsImage from '@/assets/icons/Clouds.png';

export const WeatherPanel = () => {
  const { selectedLocation: placeId } = useLocationStore();

  if (!placeId) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex justify-center items-center w-[320px] h-[320px] aspect-square">
          <img
            src={CloudsImage}
            alt="선택된 위치 없음"
            className="object-contain w-full h-full"
          />
        </div>
        <p className="text-black font-semibold mt-4">아직 선택된 위치가 없습니다!</p>
      </div>
    );
  }  

  return (
    <div className="bg-[#F6F6F6] flex flex-col justify-center items-center gap-6 p-6 min-h-screen">
      <DailyWeatherCard />
      <HourlyTimeline />
      <WeeklyForecast />
    </div>
  );
};