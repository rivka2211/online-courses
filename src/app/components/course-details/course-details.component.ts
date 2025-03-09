import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';
import { Lesson } from '../../../models/lesson';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../models/course';
import { LessonDetailsComponent } from '../lesson-details/lesson-details.component';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-course-details',
  templateUrl:'./course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input()
  course!:Course
  isTeacher=false
  lessons:Lesson[]=[];
  teacherName: string='';
  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    public dialog: MatDialog,
    private userService: UserService
  ) { }
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('productId');
      if (id) {
        this.course.id =parseInt(id);
      } else {
        console.error('Product ID not found');
      }}
    )
    this.getLessons();
    this.isTeacher=localStorage.getItem('role')=='teacher'
    this.teacherName=this.userService.getUserName(this.course.teacherId);
  }
  
  getLessons(): void {
    this.lessonService.getLessons(this.course.id).subscribe(
      (data) => {
        this.lessons = data;
      },
      (error) => {
        console.error('Error fetching lessons', error);
      }
    );
  }
  addLesson() {
   alert("add lesson")
  }
  editLesson(lessonId: number): void {
    alert("עריכת שיעור")
    // פעולה לעריכת שיעור
  }
  
  deleteLesson(lessonId: number): void {
    this.lessonService.deleteLesson(this.course.id, lessonId).subscribe(
      () => {
        this.getLessons(); // רענון רשימת השיעורים
      },
      (error) => {
        console.error('Error deleting lesson', error);
      }
    );
  }
  openLessonDialog(lessonId: number, courseName: string, teacherName: string,courseId: number): void {
    const dialogRef = this.dialog.open(LessonDetailsComponent, {
      width: '500px',
      data: { lessonId, courseName, teacherName,courseId }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Lesson dialog closed');
    });
  } 
}

