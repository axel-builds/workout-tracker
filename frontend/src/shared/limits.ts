export const WORKOUT_NAME_LIMIT = 40;
export const NOTE_LIMIT = 200;

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength);
}
