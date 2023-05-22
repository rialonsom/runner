export function convertToDegreeTimeString(timeSeconds: number) {
  const hours = Math.floor(timeSeconds / 3600);
  const minutes = Math.floor((timeSeconds % 3600) / 60);
  const seconds = Math.floor(timeSeconds % 60);

  const timeString =
    (hours > 0 ? `${hours}°` : '') +
    `${minutes}'` +
    `${seconds.toString().padStart(2, '0')}''`;

  return timeString;
}
