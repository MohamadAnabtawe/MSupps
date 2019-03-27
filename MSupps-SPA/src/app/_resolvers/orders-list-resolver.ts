import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ProductService } from '../_services/product.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { Product } from '../_models/product';
import { catchError } from 'rxjs/operators';
import { Orders } from '../_models/orders';
import { OrdersService } from '../_services/orders.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class OrderListResolver implements Resolve<Orders[]> {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Orders[]> {
    return this.ordersService
      .getOrders(+this.authService.decodedToken.nameid)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving your orders');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
