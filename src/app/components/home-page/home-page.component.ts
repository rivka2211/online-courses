import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoursesComponent } from "../courses/courses.component";
import { AuthService } from '../../../services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, RouterModule]
})
export class HomePageComponent implements OnInit {
  isConnected = false;
  private role = "student";
  private userId = 0;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isConnected = status;
      if (this.isConnected) {
        this.role = localStorage.getItem('role') || "student";
        this.userId = parseInt(localStorage.getItem('userId') || "0");
      }
    });
  }
  images = [
    '/images/d1.jpg',
    '/images/d2.jpg',
    '/images/d3.jpg',
    '/images/d4.jpg',
    '/images/d5.jpg',
    '/images/d6.jpg',
    '/images/d7.jpg',
    '/images/d8.jpg',
    '/images/d9.jpg',
  ];
  currentIndex = 0;


  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

