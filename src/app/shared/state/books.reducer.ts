import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { BooksApiActions, BooksPageActions } from 'src/app/books/actions';
import { BookModel, calculateBooksGrossEarnings } from 'src/app/shared/models';

export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
}

export const adapter: EntityAdapter<BookModel> = createEntityAdapter<
  BookModel
>();

export const initialState: State = adapter.getInitialState({
  activeBookId: null
});

export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.enter, BooksPageActions.clearSelectedBook, state => {
    return {
      ...state,
      activeBookId: null
    };
  }),

  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId
    };
  }),

  on(BooksApiActions.booksLoaded, (state, action) => {
    return adapter.addAll(action.books, state);
  }),

  on(BooksApiActions.bookCreated, (state, action) => {
    return adapter.addOne(action.book, { ...state, activeBookId: null });
  }),

  on(BooksApiActions.bookUpdated, (state, action) => {
    return adapter.updateOne(
      {
        id: action.book.id,
        changes: action.book
      },
      {
        ...state,
        activeBookId: null
      }
    );
  }),

  on(BooksApiActions.bookDeleted, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

/**
 * Simple "Getter" Selectors
 */
export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;

/**
 * Complex Selectors
 */
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (bookEntities, activeBookId) => {
    return activeBookId ? bookEntities[activeBookId] : null;
  }
);

export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
