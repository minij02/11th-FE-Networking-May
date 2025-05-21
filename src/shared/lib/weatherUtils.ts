export const formatTemperature = (value: number): string => {
  return `${value.toFixed(1)}`;
};

export const formatTime = (timeString: string) =>
  new Date(timeString).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
