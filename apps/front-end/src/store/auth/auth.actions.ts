export enum AuthActions {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}



export type AuthActionsMap = {
  [AuthActions.SET_USER]: User;
  [AuthActions.CLEAR_USER]: null;
};
