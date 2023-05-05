import { createUserPreference } from './createUserPreference';

export const useUserDummyPreference = createUserPreference<boolean>(
  'dummy',
  false,
);
