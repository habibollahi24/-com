import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';

export interface Email {
  to: string;
  subject: string;
  from: string;
  text: string;
  html: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  url = ' https://api.angular-email.com';
  http = inject(HttpClient);

  getEmails() {
    return this.http.get<Email[]>(`${this.url}/emails`).pipe();
  }
  getEmail(id: string) {
    return this.http.get<Email>(`${this.url}/emails/${id}`).pipe();
  }
  createEmail(credential: any) {
    return this.http
      .post<any>(`${this.url}/emails`, credential)
      .pipe(tap(console.log));
  }
}
