import { useState } from 'react';
import {
  UserPreference,
  UserPreferenceType,
  getUserPreference,
} from '../data/storage/getUserPreference';
import { setUserPreference } from '../data/storage/setUserPreference';

type UserPreferenceHook<T> = () => [T, (value: T) => void];

/**
 * Returns a hook that can be used for getting and updating a user preference.
 * Only use with types string, number and boolean.
 */
export function createUserPreference<T>(
  name: string,
  defaultValue: T,
): UserPreferenceHook<T> {
  const initialPreferenceValue =
    getUserPreference(name, typeof defaultValue as UserPreferenceType) ??
    defaultValue;

  const useUserPreference: UserPreferenceHook<T> = () => {
    const [preferenceValueState, setPreferenceValueState] = useState<T>(
      initialPreferenceValue as T,
    );

    const setUserPreferenceValue = (value: T) => {
      setUserPreference(name, value as UserPreference);
      setPreferenceValueState(value);
    };

    return [preferenceValueState, setUserPreferenceValue];
  };

  return useUserPreference;
}
