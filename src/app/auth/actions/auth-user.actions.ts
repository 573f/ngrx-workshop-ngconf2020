import { createAction } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  (username: string, password: string) => ({ username, password })
);

export const logout = createAction('[Auth] Logout');
