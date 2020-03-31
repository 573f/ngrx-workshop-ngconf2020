import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromBooks from './books.reducer';
import { logoutMetaReducer } from './logout.metareducer';

export interface State {
  books: fromBooks.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = [logoutMetaReducer];

// region: Books Selector
export const selectBooksState = (state: State) => state.books;

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);

export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);

export const selectBookEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);
// endregion

// region: Auth Selectors
export const selectAuthState = (state: State) => state.auth;

export const selectGettingAuthStatus = createSelector(
  selectAuthState,
  fromAuth.selectGettingStatus
);

export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);

export const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectError
);
// endregion
