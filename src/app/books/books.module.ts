import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from 'src/app/material.module';

import { BooksApiEffects } from './books-api.effects';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { BooksTotalComponent } from './components/books-total/books-total.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: 'books', component: BooksPageComponent }]),
    EffectsModule.forFeature([BooksApiEffects])
  ],
  declarations: [
    BooksPageComponent,
    BookDetailComponent,
    BooksListComponent,
    BooksTotalComponent
  ]
})
export class BooksModule {}
