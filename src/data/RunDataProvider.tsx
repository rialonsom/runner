import React, { useMemo, useReducer } from 'react';
import { Run, getRuns } from './storage/getRuns';
import { addRun } from './storage/addRun';
import { editRun } from './storage/editRun';
import { deleteRun } from './storage/deleteRun';

export type RunDataContextValue = {
  state: Run[];
  dispatch: React.Dispatch<{
    action: RunDataReducerAction;
    data: Run;
  }>;
};

export const RunDataContext = React.createContext({
  state: [] as Run[],
  dispatch: ({}: { action: RunDataReducerAction; data: Run }) => {},
});

export enum RunDataReducerAction {
  Add,
  Edit,
  Delete,
}

function runDataReducer(
  state: Run[],
  { action, data }: { action: RunDataReducerAction; data: Run },
) {
  if (action === RunDataReducerAction.Add) {
    return addRun(data);
  } else if (action === RunDataReducerAction.Edit) {
    return editRun(data);
  } else if (action === RunDataReducerAction.Delete) {
    return deleteRun(data);
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
