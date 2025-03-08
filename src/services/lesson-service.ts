import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getLessons(courseId: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getLessonById(courseId: string, lessonId: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  createLesson(courseId: string, lessonData: any, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateLesson(courseId: string, lessonId: string, lessonData: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteLesson(courseId: string, lessonId: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
