import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private static currentUserKey = 'currentUser';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // ברירת מחדל: לא מחובר
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  private setCurrentUser(user: any): void {
    localStorage.setItem(AuthService.currentUserKey, JSON.stringify(user));
  }

  // קבלת פרטי המשתמש
  static getCurrentUser(): any {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  register(name: string, email: string, password: string, role: string): Observable<User> {
    console.log("in auth service/register,the details are:", name, email, password, role);
    const res = this.http.post<User>(`${this.apiUrl}/register`, { name, email, password, role }).pipe(
      tap((res: any) => {
        
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId',res.userId);
        localStorage.setItem('role',res.role);
      }));
      this.setCurrentUser({ name, email, password, role });
      this.isLoggedInSubject.next(true);
    return res;
  }
  login(email: string, password: string): Observable<any> {
    console.log("in auth service/login,the details are:", email, password);
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);

        this.setCurrentUser({ 
          email, 
          password,
          userId: res.userId,
          role: res.role 
        });
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    console.log("in auth-service/logout");
    console.log("current user", localStorage.getItem("userId"));
    localStorage.removeItem('token');
    localStorage.removeItem(AuthService.currentUserKey);
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
  }
}
