import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, role: string): Observable<any> {
    console.log("in auth service/register,the details are:",name,email,password,role);
    
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  login(email: string, password: string): Observable<any> {
    console.log("in auth service/login,the details are:",email,password);
    
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
}
