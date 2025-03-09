import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  
  constructor(private http: HttpClient) {}
  
  getUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
  getUserName(id: string): string {
    let myname: string = '';
    try {
      this.getUser(id).subscribe(data => {
      myname= data.name|| '';})
    } catch (error) {
      console.log(error);
    } 
    return myname;
  }
  updateUser(id: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/${id}`, userData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
