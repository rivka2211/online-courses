
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService} from '../../../services/auth-service'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true, 
  templateUrl: './auth.component.html', 
  styleUrls: ['./auth.component.scss'],
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [ AuthService]
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      name: [{ value: '', disabled: this.isLoginMode }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.get('name')?.disable();
    } else {
      this.authForm.get('name')?.enable();
    }
  }

  async onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
  
    const { name, email, password } = this.authForm.value;
  
    try {
      if (this.isLoginMode) {
        this.authService.login(email, password);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      } else {
        this.authService.register(name, email, password, 'student');
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.onSwitchMode();
      }
    } catch (error) {
      this.snackBar.open('Authentication failed. Please try again.', 'Close', { duration: 3000 });
    }
  }
}
