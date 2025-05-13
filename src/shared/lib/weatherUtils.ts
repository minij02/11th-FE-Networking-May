export const kelvinToCelsius = (k: number) => Math.round(k - 273.15);

export const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });