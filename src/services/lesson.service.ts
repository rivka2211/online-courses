import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  // private apiUrl = 'http://localhost:3000/api/courses';
  private apiUrl = 'https://coursesangularserver.onrender.com/api/courses';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token =localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getLessons(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  getLesson(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  createLesson(courseId: number, lessonData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData, { headers });
  }

  updateLesson(courseId: number, lessonId: number, lessonData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, { headers });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
}

