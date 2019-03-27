import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { AlertifyService } from '../_services/alertify.service';
import { Product } from '../_models/product';
import { AuthService } from '../_services/auth.service';
import { ProductCart } from '../_models/productCart';
import { privateEncrypt } from 'crypto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ProductCart[];
  totalPrice: number;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartService.getCart(this.authService.decodedToken.nameid).subscribe(
      (cart: ProductCart[]) => {
        this.cart = cart;
        this.totalPrice = 0;
        cart.forEach(element => {
          this.totalPrice += element.product.price * element.quantity;
        });
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  cartIsEmpty(): boolean {
    return this.cart == null || this.cart.length === 0;
  }
  confirmOrder(){

  }
}
