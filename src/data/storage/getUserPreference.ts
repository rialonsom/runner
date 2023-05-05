import { storage } from './storage';

export type UserPreference = string | number | boolean;
export type UserPreferenceType = 'string' | 'number' | 'boolean';

export function getUserPreference(
  preference: string,
  type: UserPreferenceType,
): string | number | boolean | undefined {
  const preferenceKey = `user.preference.${preference}`;
  if (!storage.contains(preferenceKey)) {
    return;
  }

  if (type === 'string') {
    return storage.getString(preferenceKey);
  } else if (type === 'number') {
    return storage.getNumber(preferenceKey);
  } else if (type === 'boolean') {
    return storage.getBoolean(preferenceKey);
  }
}
