import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models';

import {
  selectAuthError,
  selectAuthUser,
  selectGettingAuthStatus,
  State
} from '../../../shared/state';
import { AuthUserActions } from '../../actions';
import { LoginEvent } from '../login-form';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean>;
  user$: Observable<UserModel | null>;
  error$: Observable<string | null>;

  constructor(readonly store: Store<State>) {
    this.gettingStatus$ = store.select(selectGettingAuthStatus);
    this.user$ = store.select(selectAuthUser);
    this.error$ = store.select(selectAuthError);
  }

  onLogin($event: LoginEvent) {
    this.store.dispatch(
      AuthUserActions.login($event.username, $event.password)
    );
  }
}
