import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { UserService } from './user-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  providers: [UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  signupFailed: boolean = false;
  signupSuccess: boolean = false;
  
  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDontMatch: true };
  }

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordsMatchValidator }
);

  get f() {
    return this.signupForm.controls;
  }

  constructor(private userService: UserService, private router: Router) {}

  signup() {
    const user = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      password: this.f.password.value
    };

    console.log('success');

    if (user.email && user.password) {
      this.userService.registerUser(user).subscribe(success => {
        if (success) {
          this.signupSuccess = true;  // Display success message
          this.signupFailed = false;
          setTimeout(() => {
            this.router.navigate(['login']);  // Redirect to login after success
          }, 1000);
        } else {
          this.signupFailed = true;  // Display error message if user exists
          this.signupSuccess = false;
        }
      });
    }
  }
}