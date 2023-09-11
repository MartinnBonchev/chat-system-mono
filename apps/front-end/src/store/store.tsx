import type { PropsWithChildren, Dispatch } from 'react';
import {
  useCallback,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import configureAxios from '@utils/axios';
import type { DispatchAction, AppState } from './types';
import authReducer from './auth/auth.reducer';
import { authInitialState } from './auth/auth.types';

const AppContext = createContext<any>({});

export function useAppContext(): [
  state: AppState,
  dispatch: Dispatch<DispatchAction>,
] {
  const context = useContext(AppContext);
  return [context.state, context.dispatch];
}

const combineDispatch =
  (...dispatches: Dispatch<DispatchAction>[]) =>
  (action: DispatchAction) =>
    dispatches.forEach((dispatch) => dispatch(action));

export default function AppContextProvider(props: PropsWithChildren) {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(combineDispatch(authDispatch), [authDispatch]);

  const state = useMemo(() => ({ auth: authState }), [authState]);

  const value = useMemo(() => ({ state, dispatch }), [dispatch, state]);

  configureAxios(dispatch);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AppContext.Provider value={value} {...props} />;
}
