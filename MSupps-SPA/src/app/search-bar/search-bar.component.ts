import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {}
  search(searchString: string) {
    if (searchString) {
      this.router.navigate(['supplements/search', searchString]);
    } else {
      this.alertify.error('The searching feild is empty!');
    }
  }
}
