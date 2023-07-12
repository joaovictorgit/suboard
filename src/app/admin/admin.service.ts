import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  accessToken = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  httpOptionAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json}',
      Authorization: `Bearer ${this.localStorage.get('@token')}`,
    }),
  };

  loginAdmin(email: string, password: string) {
    return this.http.post(
      `${this.url}/admin/login`,
      JSON.stringify({
        email,
        password,
      }),
      this.httpOptions
    );
  }

  showAllUsers() {
    return this.http.get(`${this.url}/admin/`, this.httpOptionAuthorization);
  }
}
