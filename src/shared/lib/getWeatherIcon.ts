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

export const getWeatherIcon = (description: string, isDaytime: boolean): string => {
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

  return isDaytime ? MorningWind : NightWind;
};