import { Injectable } from '@angular/core';
import { OrderedProduct } from '../_models/orderedProduct';
import { Observable } from 'rxjs';
import { Orders } from '../_models/orders';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getOrderDetails(id: number): Observable<OrderedProduct[]> {
    return this.http.get<OrderedProduct[]>(this.baseUrl + 'orders/order/' + id);
  }

  getOrders(id: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseUrl + 'orders/' + id);
  }
  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseUrl + 'orders/allOrders');
  }
  confirmOrder(){
    
  }
}
