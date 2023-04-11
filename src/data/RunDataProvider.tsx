import React, { useMemo, useReducer } from 'react';
import { Run, getRuns } from './storage/getRuns';
import { addRun } from './storage/addRun';

export type RunDataContextValue = {
  state: Run[];
  dispatch: React.Dispatch<{
    action: RunDataReducerAction;
    data: Omit<Run, '_id'>;
  }>;
};

export const RunDataContext = React.createContext({
  state: [] as Run[],
  dispatch: ({}: {
    action: RunDataReducerAction;
    data: Omit<Run, '_id'>;
  }) => {},
});

export enum RunDataReducerAction {
  Add,
}

function runDataReducer(
  state: Run[],
  { action, data }: { action: RunDataReducerAction; data: Omit<Run, '_id'> },
) {
  if (action === RunDataReducerAction.Add) {
    return addRun(data);
  }
  return state;
}

export function RunDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(runDataReducer, getRuns());

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <RunDataContext.Provider value={value}>{children}</RunDataContext.Provider>
  );
}
