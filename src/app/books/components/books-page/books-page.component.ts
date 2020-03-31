import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookModel, BookRequiredProps } from 'src/app/shared/models';
import { BooksService } from 'src/app/shared/services';

import {
  selectActiveBook,
  selectAllBooks,
  selectBookEarningsTotals,
  State
} from '../../../shared/state';
import { BooksApiActions, BooksPageActions } from '../../actions';

@Component({
  selector: 'app-books',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  books$ = this.store.select(selectAllBooks);
  currentBook$ = this.store.select(selectActiveBook);
  total$ = this.store.select(selectBookEarningsTotals);

  constructor(
    private booksService: BooksService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
  }

  onCancel() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ('id' in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
    this.booksService.create(bookProps).subscribe(book => {
      this.store.dispatch(BooksApiActions.bookCreated({ book: book }));
    });
  }

  updateBook(book: BookModel) {
    this.store.dispatch(
      BooksPageActions.updateBook({ bookId: book.id, book: book })
    );
    this.booksService.update(book.id, book).subscribe(book => {
      this.store.dispatch(BooksApiActions.bookUpdated({ book: book }));
    });
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
    this.booksService.delete(book.id).subscribe(() => {
      this.store.dispatch(BooksApiActions.bookDeleted({ bookId: book.id }));
    });
  }
}
