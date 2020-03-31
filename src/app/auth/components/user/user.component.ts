import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models';
import { selectAuthUser, State } from 'src/app/shared/state';

import { AuthUserActions } from '../../actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user$: Observable<UserModel | null>;

  constructor(readonly store: Store<State>) {
    this.user$ = store.select(selectAuthUser);
  }

  onLogout() {
    this.store.dispatch(AuthUserActions.logout());
  }
}
