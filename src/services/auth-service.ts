import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserKey = 'currentUser';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
      const storedUser = this.getCurrentUser();
      if (storedUser) {
        this.isLoggedInSubject.next(true);
      }
  }

  private setCurrentUser(user: any): void {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): any {
    console.log("in getCurrentUser");
      let userJson = localStorage.getItem(this.currentUserKey);
      return userJson ? JSON.parse(userJson) : null;
  }

  // private hasStoredUser(): boolean {
  //   if (typeof window === 'undefined') {
  //     return false;
  //   }
  //   return !!localStorage.getItem(this.currentUserKey);
  // }

  register(name: string, email: string, password: string, role: string): Observable<User> {
    console.log("in auth service/register, the details are:", name, email, password, role);
    return this.http.post<User>(`${this.apiUrl}/register`, { name, email, password, role }).pipe(
      tap((res: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('role', res.role);
          this.setCurrentUser({ name, email, userId: res.userId, role: res.role });
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    console.log("in auth service/login, the details are:", email, password);
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        console.log(res.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('role', res.role);
          this.setCurrentUser({
            email,
            userId: res.userId,
            role: res.role
          });
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    console.log("in auth-service/logout");
      localStorage.clear();
      this.isLoggedInSubject.next(false);
  }
}
