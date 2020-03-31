import { Action, ActionReducer } from '@ngrx/store';
import { AuthUserActions } from 'src/app/auth/actions';

export function logoutMetaReducer(reducer: ActionReducer<any>) {
  return function(state: any, action: Action) {
    return action.type === AuthUserActions.logout.type
      ? reducer(undefined, action)
      : reducer(state, action);
  };
}
