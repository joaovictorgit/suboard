import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public user$: Observable<any[]> = this.usersSubject.asObservable();

  url = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  accessToken = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  httpOptionsImage = {
    headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
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
    return this.http.get(
      `${this.url}/admin/users/`,
      this.httpOptionAuthorization
    );
  }

  createImage(id: any, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return this.http.post(
      `${this.url}/admin/${id}/upload`,
      image,
      this.httpOptionsImage
    );
  }

  updatedUser(
    id: string,
    name: string,
    email: string,
    subscribed: string,
    channel: string,
    category: string
  ): Observable<any> {
    return this.http.put(
      `${this.url}/admin/user/${id}`,
      JSON.stringify({
        name,
        email,
        subscribed,
        channel,
        category,
      }),
      this.httpOptionAuthorization
    );
  }

  deleteUser(id: any) {
    return this.http.delete(
      `${this.url}/admin/${id}`,
      this.httpOptionAuthorization
    );
  }

  getAllUsers(): void {
    this.http
      .get(`${this.url}/admin/users/`, this.httpOptionAuthorization)
      .subscribe((response: any) => {
        this.usersSubject.next(response.results);
      });
  }

  createUser(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    subscribed: string,
    channel: string,
    category: string
  ) {
    return this.http.post(
      `${this.url}/admin/user`,
      JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        subscribed,
        channel,
        category,
      }),
      this.httpOptions
    );
  }
}
