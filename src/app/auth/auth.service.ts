import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private username = new BehaviorSubject<string>('');

  readonly username$ = this.username
    .asObservable()
    .pipe(map((username) => username + '@angular-email.com'));

  private isAutenticatedState = new BehaviorSubject<null | boolean>(null);
  readonly isAutenticated$ = this.isAutenticatedState.asObservable();

  base_url = 'https://api.angular-email.com';

  usernameAvailable(username: string) {
    return this.http.post(`${this.base_url}/auth/username`, {
      username,
    });
  }

  setIsAutenticatedState(value: boolean | null) {
    this.isAutenticatedState.next(value);
  }

  signedin() {
    return this.http.get<any>(`${this.base_url}/auth/signedin`).pipe(
      tap(({ authenticated, username }) =>
        authenticated
          ? this.isAutenticatedState.next(true)
          : this.isAutenticatedState.next(false),
      ),
      tap(({ username }) => this.username.next(username)),
      catchError(() => {
        this.isAutenticatedState.next(false);
        return EMPTY;
      }),
    );
  }
  signup(credential: any) {
    return this.http.post(`${this.base_url}/auth/signup`, credential).pipe(
      tap(() => {
        this.isAutenticatedState.next(true);
        this.username.next(credential.username);
      }),
    );
  }
  signin(credential: any) {
    return this.http.post(`${this.base_url}/auth/signin`, credential).pipe(
      tap(() => {
        this.isAutenticatedState.next(true);
        this.username.next(credential.username);
      }),
    );
  }
  signout() {
    return this.http
      .post(`${this.base_url}/auth/signout`, {})
      .pipe(tap(() => this.isAutenticatedState.next(false)));
  }
}
