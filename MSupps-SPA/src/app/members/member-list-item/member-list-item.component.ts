import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.css']
})
export class MemberListItemComponent implements OnInit {
  @Input() user: User;
  constructor(private alertify: AlertifyService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {}
  deleteUser(){
    this.userService.deleteUser(this.user.id).subscribe(next => {
      this.alertify.success('User deleted successfully');
      this.router.navigate(['/home']);
    }, error => {
        this.alertify.error(error);
    }
    );
  }
}
