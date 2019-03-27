import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // model contain the input values we pass to the server on register
  model: any = {};

  @ViewChild('registerForm') registerForm: NgForm;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  ngOnInit() {}

  /*------------------------------Register method------------------------------- */
  register() {
    // subscribe to the post  in the register method in authService and pass the model
    if (this.checkConfirmPassword()) {
      this.authService.register(this.model).subscribe(
        () => {
          this.alertify.success('registered successfully');
        },
        error => {
          this.alertify.error(error);
        }
      );
      this.router.navigate(['home']);
    } else {
      this.alertify.error('Confirmation password must match!');
    }
  }
  checkConfirmPassword(): boolean {
    return this.model.password === this.model.password_confirmation;
  }
}
