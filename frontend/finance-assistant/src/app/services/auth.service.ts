import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // BehaviorSubject for login status
    loggedIn = new BehaviorSubject<boolean>(false);
    authStatus = this.loggedIn.asObservable();

    constructor(private router: Router) {
        this.checkLoginStatusOnInit(); // Check login status on app initialization
    }

    // Check if localStorage is available
    private isLocalStorageAvailable(): boolean {
        try {
            return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
        } catch (e) {
            return false;
        }
    }

    // Check if the user is logged in by checking the token in localStorage
    checkLoginStatusOnInit() {
        if (this.isLocalStorageAvailable()) {
            const token = localStorage.getItem('token');
            if (token) {
                this.loggedIn.next(true); // Set loggedIn to true if token exists
            }
        }
    }

    // Logout method to clear the token and reset login state
    logout() {
        if (this.isLocalStorageAvailable()) {
            localStorage.removeItem('token'); // Clear the token from localStorage
        }
        this.loggedIn.next(false);        // Update login status
        this.router.navigate(['login']);  // Redirect to login page
    }

    // Utility function to check if the token is present in localStorage
    isLoggedIn(): boolean {
        if (this.isLocalStorageAvailable()) {
            return !!localStorage.getItem('token'); // Return true if token exists
        }
        return false;
    }
}
