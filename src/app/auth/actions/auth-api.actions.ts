import { createAction } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models';

export const getAuthStatusSuccess = createAction('[Auth] Status Success', (user: UserModel | null) => ({ user }));

export const loginSuccess = createAction('[Auth] Login Success', (user: UserModel) => ({ user }));

export const loginFailure = createAction('[Auth] Login Failure', (error: string) => ({ error }));