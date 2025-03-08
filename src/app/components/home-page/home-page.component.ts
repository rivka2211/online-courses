import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl:'./home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule]
})
export class HomePageComponent {
  images = [
    '/images/d1.jpg',
    '/images/d2.jpg',
    '/images/d3.jpg',
    '/images/d4.jpg',
    '/images/d5.jpg',
    '/images/d6.jpg',
    '/images/d7.jpg', '/images/d8.jpg', '/images/d9.jpg',
  ];
  
  
  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

