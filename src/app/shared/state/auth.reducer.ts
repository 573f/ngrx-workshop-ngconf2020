import { Action, createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthUserActions } from 'src/app/auth/actions';

import { UserModel } from '../models';

export interface State {
  gettingStatus: boolean;
  user: UserModel | null;
  error: string | null;
}

export const initialState: State = {
  gettingStatus: false,
  user: null,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthUserActions.logout, (state, action) => {
    return {
      gettingStatus: false,
      user: null,
      error: null
    };
  }),
  on(AuthUserActions.login, (state, action) => {
    return {
      gettingStatus: true,
      user: null,
      error: null
    };
  }),
  on(AuthApiActions.getAuthStatusSuccess, (state, action) => {
    return {
      gettingStatus: false,
      user: action.user,
      error: null
    };
  }),
  on(AuthApiActions.loginSuccess, (state, action) => {
    return {
      gettingStatus: false,
      user: action.user,
      error: null
    };
  }),
  on(AuthApiActions.loginFailure, (state, action) => {
    return {
      gettingStatus: false,
      user: null,
      error: action.error
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

export const selectGettingStatus = (state: State) => state.gettingStatus;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
