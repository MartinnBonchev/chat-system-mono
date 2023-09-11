import { PayloadAction } from '../types';
import { AuthActionsMap } from './auth.actions';
import { AuthState } from './auth.types';

export default function authReducer(
  state: AuthState,
  action: PayloadAction<AuthActionsMap>,
): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case 'CLEAR_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
