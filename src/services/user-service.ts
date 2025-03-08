import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUser(id: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateUser(id: string, userData: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteUser(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
