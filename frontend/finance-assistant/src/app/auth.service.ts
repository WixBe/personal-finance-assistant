import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";

interface LoginResponse {
    success: boolean;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    private users = [
        { email: 'user@gmail.com', password: 'password' },
        { email: 'admin@gmail.com', password: 'password' }
    ];

    private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

    authStatus = this.loggedIn.asObservable();

    constructor(private router: Router) {}

    login(email: string, password: string): Observable<boolean> {
        const user = this.users.find(
            user => user.email === email && user.password === password
        );
        if (user) {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('auth-token', 'mock-token');
            }
            this.loggedIn.next(true);
            return of(true);
        } else {
            return of(false);
        }
    }

    signup(email: string, password: string): Observable<boolean> {
        const userExist = this.users.find(
            user => user.email === email && user.password
        );
        if (!userExist) {
            this.users.push({email, password});
            return of(true);
        } else {
            return of(false);
        }
    }

    logout() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('auth-token');
        }
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
        if (typeof localStorage !== 'undefined') {
            return !!localStorage.getItem('auth-token');
        }
        return false;
    }
}
