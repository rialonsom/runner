import { storage } from './storage';

export function checkUserPreference(preference: string): boolean {
  const preferenceKey = `user.preference.${preference}`;
  return storage.contains(preferenceKey);
}
