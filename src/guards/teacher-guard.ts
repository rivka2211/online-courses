import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
    providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn$ &&
            (localStorage.getItem('role') || '') in ['admin', 'teacher']) {
            return true;
        }
        else {
            this.router.navigate(['/courses']);
            return false;
        }
    }
}