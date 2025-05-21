import { DailyWeatherCard } from "./ui/DailyWeatherCard";
import { HourlyTimeline } from "./ui/HourlyTimeline";
import { WeeklyForecast } from "./ui/WeeklyForecast";
import useLocationStore from "@/shared/store/useLocationStore";
import CloudsImage from "@/assets/icons/clouds-morning.png";

export const WeatherPanel = () => {
  const { selectedLocationId: placeId,} = useLocationStore();

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
        <p className="text-black text-[36px] font-bold leading-normal font-pretendard mt-4">
          아직 선택된 위치가 없습니다!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F6F6] flex flex-col justify-center items-center gap-[24px] p-6 min-h-screen">
      <div
        className="flex flex-col items-start gap-[12px] w-[1080px] p-[32px] 
                  rounded-[16px] border-2 border-[#F2F2F2] bg-white 
                  shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)]"
      >
        <DailyWeatherCard />
      </div>

      <div
        className="flex w-[1080px] p-[24px] flex-col items-start gap-[24px]
                  rounded-[16px] border border-[#F2F2F2] bg-white
                  shadow-[0px_0px_8px_2px_rgba(0,0,0,0.10)]"
      >
        <HourlyTimeline />
      </div>

      <div
        className="flex w-[1080px] p-[24px] flex-col items-start gap-[12px] 
                  rounded-[16px] border border-[#F2F2F2] bg-white 
                  shadow-[0px_0px_8px_2px_rgba(0,0,0,0.10)]"
      >
        <WeeklyForecast />
      </div>
    </div>
  );
};
