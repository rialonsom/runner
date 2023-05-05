import { storage } from './storage';

export function setUserPreference(
  preference: string,
  value: string | number | boolean,
): void {
  storage.set(`user.preference.${preference}`, value);
}
