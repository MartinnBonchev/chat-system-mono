import type { AuthState } from './auth/auth.types';
import { AuthActionsMap } from './auth/auth.actions';

export type PayloadAction<TAction> = {
  [Key in keyof TAction]: {
    type: Key;
    payload: TAction[Key];
  };
}[keyof TAction];

export type DispatchAction = PayloadAction<AuthActionsMap>;

export interface AppState {
  auth: AuthState;
}
