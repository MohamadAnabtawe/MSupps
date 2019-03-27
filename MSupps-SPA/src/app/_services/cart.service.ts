import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../_models/product';
import { ProductCart } from '../_models/productCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCartId(userId): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'carts/myCart/' + userId);
  }
  getCart(userId): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(this.baseUrl + 'carts/' + userId);
  }
  addToCart(product: any) {
    return this.http.post(this.baseUrl + 'carts/add', product);
  }
  updateCart(cartId: number, product) {
    return this.http.put(this.baseUrl + 'carts/' + cartId, product);
  }
  removeFromCart(productId: number) {
    return this.http.delete(this.baseUrl + 'carts/' + productId);
  }
}
