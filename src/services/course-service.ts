import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api/courses';
  // private apiUrl = 'https://coursesangularserver.onrender.com/api/courses';

  constructor(private http: HttpClient) { }

  async getCourses(): Promise<Observable<Course[]>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Course[]>(this.apiUrl, { headers });
  }

  async getCourseById(id: number): Promise<Observable<Course>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers });
  }
 async getEnrolledCourses(studentId: number): Promise<Observable<Course[]>> {
    return this.http.get<Course[]>(`/api/courses/student/${studentId}`);
}

  async createCourse(course: Course): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, course, { headers });
  }

  async updateCourse(id: number, course: Course): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, course, { headers });
  }

  async deleteCourse(id: number): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  enrollStudentInCourse(courseId: number, userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // כדי לוודא שהשרת יודע שזה JSON
    });

    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
  }

  unenrollStudentFromCourse(courseId: number, userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // כדי לוודא שהשרת יודע שזה JSON
    });

    const url = `${this.apiUrl}/${courseId}/unenroll`; // ללא userId ב-URL
    return this.http.delete(url, { headers, body: { userId } }); // שליחת userId בגוף הבקשה
  }


  private getToken(): string {
    let res = localStorage.getItem('token');
    if (!res) {
      console.error("no conected user");
      throw new Error("no conected user");
    }
    return res;
  }
}