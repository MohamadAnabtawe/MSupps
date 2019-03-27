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
import { catchError } from 'rxjs/operators';
import { OrderedProduct } from '../_models/orderedProduct';
import { OrdersService } from '../_services/orders.service';

@Injectable()
export class OrderDetailsResolver implements Resolve<OrderedProduct[]> {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<OrderedProduct[]> {
    return this.ordersService.getOrderDetails(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving order details');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
