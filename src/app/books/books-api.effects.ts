import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';

import { BooksService } from '../shared/services';
import { BooksApiActions, BooksPageActions } from './actions';

@Injectable()
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.enter),
      exhaustMap(() =>
        this.booksService
          .all()
          .pipe(map(books => BooksApiActions.booksLoaded({ books: books })))
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap(action =>
        this.booksService
          .create(action.book)
          .pipe(map(newBook => BooksApiActions.bookCreated({ book: newBook })))
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap(action =>
        this.booksService
          .update(action.bookId, action.book)
          .pipe(
            map(updatedBook =>
              BooksApiActions.bookUpdated({ book: updatedBook })
            )
          )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap(action =>
        this.booksService
          .delete(action.bookId)
          .pipe(
            map(() => BooksApiActions.bookDeleted({ bookId: action.bookId }))
          )
      )
    )
  );
}
