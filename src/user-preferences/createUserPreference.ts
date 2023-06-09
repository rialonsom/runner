import { useEffect, useState } from 'react';
import {
  UserPreference,
  getUserPreference,
} from '../storage/getUserPreference';
import { setUserPreference } from '../storage/setUserPreference';
import { checkUserPreference } from '../storage/checkUserPreference';
import { Subject } from 'rxjs';

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

  const preferenceSubject = new Subject<T>();

  const useUserPreference: UserPreferenceHook<T> = () => {
    const [preferenceValueState, setPreferenceValueState] = useState<T>(
      getUserPreference<T>(name, typeof defaultValue) ?? defaultValue,
    );

    const setUserPreferenceValue = (value: T) => {
      setUserPreference(name, value);
      preferenceSubject.next(value);
    };

    useEffect(() => {
      const subscription = preferenceSubject.subscribe({
        next: value => {
          setPreferenceValueState(value);
        },
      });
      return () => subscription.unsubscribe();
    }, []);

    return [preferenceValueState, setUserPreferenceValue];
  };

  return useUserPreference;
}
