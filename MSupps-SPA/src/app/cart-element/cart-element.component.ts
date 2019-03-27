import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../_models/product';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { CartService } from '../_services/cart.service';
import { ProductCart } from '../_models/productCart';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.css']
})
export class CartElementComponent implements OnInit {
  @Input() cartProduct: ProductCart;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private cartService: CartService,
    private router: Router,
    private cart: CartComponent
  ) {}

  ngOnInit() {}

  removeItem() {
    this.cartService.removeFromCart(this.cartProduct.product.id).subscribe(next => {
      this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/cart']));
    }, error => {
        this.alertify.error(error);
    }
    );
  }
  updateQuantity(quantity) {
    this.cartProduct.quantity = quantity;
    this.cartService.updateCart(this.cartProduct.cartId, this.cartProduct).subscribe(next => {
      this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/cart']));
    }, error => {
        this.alertify.error(error);
    }
    );
  }
}
