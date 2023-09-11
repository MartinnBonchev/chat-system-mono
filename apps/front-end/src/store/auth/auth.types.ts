export interface AuthState {
  user: MaybeNullable<User>;
  isAuthenticated: boolean;
}

export const authInitialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
