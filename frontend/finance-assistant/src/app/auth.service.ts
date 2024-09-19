import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {


    private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

    authStatus = this.loggedIn.asObservable();

    constructor(private router: Router) {}

    logout() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('token');
        }
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
        if (typeof localStorage !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    }
}
