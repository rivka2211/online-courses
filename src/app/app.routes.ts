import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LessonDetailsComponent } from './components/lesson-details/lesson-details.component';
import { CourseDetailComponent } from './components/course-details/course-details.component';
import { AuthGuard } from '../guards/auth-guard';
import { TeacherGuard } from '../guards/teacher-guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
    { path: 'courses/:courseId', component: CourseDetailComponent, canActivate: [AuthGuard] },
    { path: 'courses/:courseId/lessons/:lessonId', component: LessonDetailsComponent, canActivate: [AuthGuard] },
    { path: 'manage', component: CoursesComponent, canActivate: [TeacherGuard] },
    { path: '**', redirectTo: '/home' }
];

