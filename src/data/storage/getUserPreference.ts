import { storage } from './storage';

export type UserPreference = string | number | boolean;

export function getUserPreference<T extends UserPreference>(
  preference: string,
  type: string,
): T | undefined {
  const preferenceKey = `user.preference.${preference}`;
  if (!storage.contains(preferenceKey)) {
    return;
  }

  if (type === 'string') {
    return storage.getString(preferenceKey) as T;
  } else if (type === 'number') {
    return storage.getNumber(preferenceKey) as T;
  } else if (type === 'boolean') {
    return storage.getBoolean(preferenceKey) as T;
  } else {
    throw new Error('Storage only supports types string, number and boolean.');
  }
}
