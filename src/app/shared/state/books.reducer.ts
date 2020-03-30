import { createReducer, on } from '@ngrx/store';
import { BooksPageActions } from 'src/app/books/actions';
import { BookModel } from 'src/app/shared/models';

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null
};

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
  })
);
