import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, ReactiveFormsModule, NgClass, NgIf, HttpClientModule]
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  submitted = false;
  invalidLogin = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
}

  get f() {
    return this.loginForm.controls;
  } 

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.login(loginDto).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token)
        console.log('Login Successful', response);
        setTimeout(() => {
          this.authService.loggedIn.next(true);
          this.router.navigate(['dashboard']);
        }, 1000)
      },
      (error) => {
        console.log('Login failed', error);
        this.invalidLogin = true;
      }
    );
  }

  login(credentials: any): Observable<any> {

    return this.http.post('http://localhost:8080/api/auth/login', credentials);
  }

  intercept(request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      return next.handle(request);
    }
  
}
