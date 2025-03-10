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
import { MatDialog } from '@angular/material/dialog';
import { AddCourseModalComponent } from '../add-course-modal/add-course-modal.component';
import { User } from '../../../models/user';

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
  isStudent: boolean=false ;
  private user:User|null=null;
  private userId:number=0

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.user=this.authService.getCurrentUser();
    if(this.user){
      this.isStudent = this.user.role === 'student';
      this.userId=parseInt(this.user.id);
    }
    await this.loadEnrolledCourses();
    await this.loadCourses();
  }
  
  private async loadEnrolledCourses() {
    try {
      const enrolledCourses = (await this.courseService.getEnrolledCourses(this.userId))
        .subscribe((courses: Course[]) => this.enrolledCourses =
          new Set(courses.map((course: Course) => course.id)));
    } catch (error) {
      this.snackBar.open('Failed to load enrolled courses.', 'Close', { duration: 3000 });
    }
  }
  
  private async loadCourses() {
    try {
      (await (this.courseService.getCourses())).subscribe((courses: Course[]) => this.courses = courses);
    } catch (error) {
      this.snackBar.open('Failed to load courses.', 'Close', { duration: 3000 });
    }
  }
  async deleteCourse(courseId: number) {
    if(this.user?.role=="student"){
      this.snackBar.open('You are not authorized to delete a course.', 'Close', { duration: 3000 });
      return;
    }
    (await this.courseService.deleteCourse(courseId)).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== courseId);
        this.snackBar.open('Course deleted successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete course.', 'Close', { duration: 3000 });
      }
    });
  }

  enroll(courseId: number) {
    this.courseService.enrollStudentInCourse(courseId,this.userId )
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
    this.courseService.unenrollStudentFromCourse(courseId, this.userId)
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
  openAddCourseModal() {
    if(this.user?.role=="student"){
      this.snackBar.open('You are not authorized to add a course.', 'Close', { duration: 3000 });
      return
    }
    const dialogRef = this.dialog.open(AddCourseModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log('Course Added:', result);
        (await this.courseService.createCourse(result)).subscribe({
          next: () => {
            this.loadCourses();
            this.snackBar.open('Course added successfully!', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Failed to add course.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
  openEditCourseModal(course: Course) {
    if(this.user?.role=="student"){
      this.snackBar.open('You are not authorized to edit a course.', 'Close', { duration: 3000 });
      return;
    }
    const dialogRef = this.dialog.open(AddCourseModalComponent, {
      width: '400px',
      data: course
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        (await this.courseService.updateCourse(course.id, result)).subscribe({
          next: () => {
            this.loadCourses();
            this.snackBar.open('Course updated successfully!', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Failed to update course.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
