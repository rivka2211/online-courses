import { Component, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';
import { Course } from '../../../models/course';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-details',
  standalone:true,
  templateUrl:'./lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css'],
  imports:[MatDialogModule]
})
export class LessonDetailsComponent implements OnInit {
  @Input()
  courseName!: String;
  @Input()
  courseId!:number
  @Input() 
  teacherNmae!: String;
  @Input()
  lessonId!: number;
  lesson: any;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
    this.getLesson();
  }

  getLesson(): void {
    this.lessonService.getLesson(this.courseId, this.lessonId).subscribe(
      (data) => {
        this.lesson = data;
      },
      (error) => {
        console.error('Error fetching lesson details', error);
      }
    );
  }
}
