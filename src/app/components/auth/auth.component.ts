import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    HttpClientModule,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
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
      role: [null, this.isLoginMode ? [] : [Validators.required]]
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
    const { name, email, password, role } = this.authForm.value;

    try {
      if (this.isLoginMode) {
        console.log("in login mode");

        this.authService.login(email, password).subscribe(
          (res) => {
            console.log("in login app", res);
            if (res.userId)
              this.snackBar.open("Login successful!", 'Close', { duration: 3000 });
            else
              this.snackBar.open("Login failed!", 'Close', { duration: 3000 });
          });
      } else {
        console.log("the role is",role);
        this.authService.register(name, email, password, role).subscribe(
          (res: any) => {
            console.log("in register app", res);
            this.snackBar.open(res.message, 'Close', { duration: 3000 });
          }
        );
        this.onSwitchMode();
      }
      this.authForm.reset();
    } catch (error) {
      this.snackBar.open('Authentication failed. Please try again.', 'Close', { duration: 3500 });
    }
  }
}
