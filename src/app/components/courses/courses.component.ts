import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../../models/course';
import { AuthService } from '../../../services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  providers: [CourseService]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  enrolledCourses: Set<number> = new Set();

  constructor(
    private courseService: CourseService,
    private authService:AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.loadEnrolledCourses();
}

private async loadEnrolledCourses() {
  try {
      (await this.courseService.getEnrolledCourses(this.authService.getCurrentUser().userId))
          .subscribe({
              next: (enrolled: Course[]) => {
                  this.enrolledCourses = new Set(enrolled.map(course => course.id));},
              error: () => {
                  this.snackBar.open('Failed to load enrolled courses.', 'Close', { duration: 3000 });
              }});
  } catch (error) {
      this.snackBar.open('Failed to load enrolled courses.', 'Close', { duration: 3000 });
  }
}

  private async loadCourses() {
    try {
      (await (this.courseService.getCourses())).subscribe((courses: Course[])=>this.courses=courses);
    } catch (error) {
      this.snackBar.open('Failed to load courses.', 'Close', { duration: 3000 });
    }
  }

  enroll(courseId: number) {
    this.courseService.enrollStudentInCourse(courseId, this.authService.getCurrentUser().userId)
      .subscribe({
        next: () => {
          this.enrolledCourses.add(courseId);
          this.snackBar.open('Enrolled successfully!', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to enroll.', 'Close', { duration: 3000 });
        }
      });
  }
  

  leave(courseId: number) {
    this.courseService.unenrollStudentFromCourse(courseId, this.authService.getCurrentUser().userId)
      .subscribe({
        next: () => {
          this.enrolledCourses.delete(courseId);
          this.snackBar.open('Left the course.', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to leave course.', 'Close', { duration: 3000 });
        }
      });
  }
  

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.has(courseId);
  }
}
