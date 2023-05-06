import { useState } from 'react';
import {
  UserPreference,
  getUserPreference,
} from '../data/storage/getUserPreference';
import { setUserPreference } from '../data/storage/setUserPreference';
import { checkUserPreference } from '../data/storage/checkUserPreference';

type UserPreferenceHook<T> = () => [T, (value: T) => void];

/**
 * Returns a hook that can be used for getting and updating a user preference.
 * Only use with types string, number and boolean.
 */
export function createUserPreference<T extends UserPreference>(
  name: string,
  defaultValue: T,
): UserPreferenceHook<T> {
  const isPreferencePersisted = checkUserPreference(name);

  if (!isPreferencePersisted) {
    setUserPreference(name, defaultValue);
  }

  const initialPreferenceValue =
    getUserPreference<T>(name, typeof defaultValue) ?? defaultValue;

  const useUserPreference: UserPreferenceHook<T> = () => {
    const [preferenceValueState, setPreferenceValueState] = useState<T>(
      initialPreferenceValue,
    );

    const setUserPreferenceValue = (value: T) => {
      setUserPreference(name, value);
      setPreferenceValueState(value);
    };

    return [preferenceValueState, setUserPreferenceValue];
  };

  return useUserPreference;
}
