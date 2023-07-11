import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
}
