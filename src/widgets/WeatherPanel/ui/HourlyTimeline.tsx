import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { fetchWeather } from "@/entities/weather/api/weatherApi";
import useLocationStore from "@/shared/store/useLocationStore";
import { getWeatherIcon } from "@/shared/lib/getWeatherIcon";
import { formatTemperature } from "@/shared/lib/weatherUtils";
import { mockWeatherData } from "@/entities/weather/model/types";
import type { HourlyWeather } from "@/entities/weather/model/types";
import { useEffect } from "react";

const CARD_WIDTH = 96;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;

export const HourlyTimeline = () => {
  const { selectedLocationId: placeId } = useLocationStore();

  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", placeId],
    queryFn: () => fetchWeather(placeId!),
    enabled: !!placeId,
  });

  useEffect(() => {
    console.log("🛰 placeId:", placeId);
    console.log("📦 API 응답:", data);
    console.error("❗ API 오류:", error);
  }, [data, error, placeId]);

  if (!placeId) return null;
  if (isLoading) return <div>시간별 날씨 로딩 중...</div>;

  const hourlyData: HourlyWeather[] =
    data?.hourlyResponse && data.hourlyResponse.length > 0
      ? data.hourlyResponse
      : mockWeatherData.hourlyResponse;

  const temperatures = hourlyData.map((d) => Number(d.temperature.toFixed(1)));
  const categories = hourlyData.map((d) => dayjs(d.date).format("HH시"));
  const chartWidth = hourlyData.length * STEP;

  const chartOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      offsetX: -4, // 보정값
    },
    xaxis: {
      categories,
      labels: {
        show: false,
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: (val: number) => `${val}°`,
        style: { colors: "#666", fontSize: "12px" },
      },
      axisTicks: { show: false },
      axisBorder: { show: true, color: "#e0e0e0" },
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: ["#3B82F6"],
    },
    markers: {
      size: 4,
      colors: ["#3B82F6"],
      strokeWidth: 0,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      borderColor: "#e0e0e0",
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => `${val}°` },
    },
  };

  const chartSeries = [
    {
      name: "온도",
      data: temperatures,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-[20px] font-[700] text-black font-pretendard">시간별 현황</div>

      <div className="relative overflow-x-auto">
        {/* ApexChart */}
        <div
          className="absolute top-0 left-0 z-0"
          style={{
    width: `${hourlyData.length * 112}px`,
    height: "160px",
    transform: `translateX(-48px)`, // 카드 중앙 기준으로 맞춤
  }}
        >
          <ApexChart
    options={{
      ...chartOptions,
      chart: {
        ...chartOptions.chart,
        offsetX: 0,
      },
    }}
    series={chartSeries}
    type="line"
    height={160}
    width={hourlyData.length * 112}
/>
        </div>

        {/* 카드 UI */}
        <div
          className="relative z-10 flex gap-[16px] pl-2 pr-4 pt-[120px]"
          style={{ minWidth: chartWidth }}
        >
          {hourlyData.map((hour) => {
            const dateTime = dayjs(hour.date);
            const hourNumber = dateTime.hour();
            const isDaytime = hourNumber >= 6 && hourNumber < 18;
            const iconSrc = getWeatherIcon(hour.weatherDescription, isDaytime);

            return (
              <div
                key={hour.date}
                className="flex flex-col items-center flex-shrink-0 w-[96px]"
              >
                <div className="w-[40px] h-[40px] mb-2">
                  <img
                    src={iconSrc}
                    alt="weather icon"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="text-xs text-gray-600">{dateTime.format("HH시")}</div>
                <div className="text-sm font-semibold text-black">
                  {formatTemperature(hour.temperature)}°
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};