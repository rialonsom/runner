import { UserPreference } from './getUserPreference';
import { storage } from './storage';

export function setUserPreference(
  preference: string,
  value: UserPreference,
): void {
  storage.set(`user.preference.${preference}`, value);
}
