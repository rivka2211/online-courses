import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../../../models/course';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
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
  }

  private async loadCourses() {
    try {
      (await this.courseService.getCourses()).subscribe(courses=>this.courses=courses);
    } catch (error) {
      this.snackBar.open('Failed to load courses.', 'Close', { duration: 3000 });
    }
  }

  async enroll(courseId: number) {
    try {
      await this.courseService.enrollStudentInCourse(courseId,AuthService.getCurrentUser().userId);
      this.enrolledCourses.add(courseId);
      this.snackBar.open('Enrolled successfully!', 'Close', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Failed to enroll.', 'Close', { duration: 3000 });
    }
  }

  // async leave(courseId: number) {
  //   try {
  //     await this.courseService.leave(courseId);
  //     this.enrolledCourses.delete(courseId);
  //     this.snackBar.open('Left the course.', 'Close', { duration: 3000 });
  //   } catch (error) {
  //     this.snackBar.open('Failed to leave course.', 'Close', { duration: 3000 });
  //   }
  // }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.has(courseId);
  }
}
