export const kelvinToCelsius = (k: number) => Math.round(k - 273.15);

export const formatTime = (timeString: string) =>
  new Date(timeString).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });