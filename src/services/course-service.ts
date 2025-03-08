import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(token: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getCourseById(courseId: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  createCourse(courseData: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, courseData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  updateCourse(courseId: string, courseData: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteCourse(courseId: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
