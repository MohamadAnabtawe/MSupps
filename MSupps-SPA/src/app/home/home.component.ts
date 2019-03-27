import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  isManager(): boolean {
    if (this.authService.loggedIn()) {
      return this.authService.decodedToken.role !== '0';
    }
    return false;
  }
}
