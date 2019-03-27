import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-Jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwHelper = new JwtHelperService();
  constructor(private authService: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.authService.decodedToken = this.jwHelper.decodeToken(token);
  }
  isManager(): boolean {
    if (this.authService.loggedIn()) {
      return this.authService.decodedToken.role !== '0';
    }
    return false;
  }
}
