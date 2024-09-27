import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = {};  // Object to hold user details

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Fetch user details from the service
    this.user = this.userService.getUserDetails();
  }
}
