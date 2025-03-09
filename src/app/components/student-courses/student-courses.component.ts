import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector:'app-student-courses',
  standalone: true, 
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  imports: [ CommonModule,
      MatListModule,
      MatButtonModule,
      MatCardModule]
})
export class StudentCoursesComponent implements OnInit {
  courses: Course[] | null = null;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  async loadCourses(): Promise<void> {
    (await this.courseService.getCourses()).subscribe(courses => this.courses = courses);
    //   (courses) => {
    //     this.courses = courses;
    //   },
    //   (error) => {
    //     console.error('Error loading courses:', error);
    //     this.courses = []; // or handle error appropriately
    //   }
    // );
  }
}