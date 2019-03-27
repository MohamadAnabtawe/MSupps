import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { Observable } from 'rxjs';
import { userInfo } from 'os';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart.service';
import { ProductCart } from 'src/app/_models/productCart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  cartId: number;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {}

  addToCart() {
    if (this.authService.loggedIn()) {
      this.cartService.getCartId(this.authService.decodedToken.nameid).subscribe(
        (id: number) => {
          this.cartId = id;
        },
        error => {
          this.alertify.error(error);
        }
      );
      this.cartService.getCart(this.authService.decodedToken.nameid).subscribe(
        (cart: ProductCart[]) => {
          const productCart: any = {};
          productCart.product = this.product;
          productCart.quantity = 1;
          productCart.cartId = this.cartId;

          this.cartService.addToCart(productCart).subscribe(
            () => {
              this.alertify.success('Added to cart');
            },
            error => {
              this.alertify.error(error);
            }
          );
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
  }
  isManager(): boolean {
    if (this.authService.loggedIn()) {
      return this.authService.decodedToken.role !== '0';
    }
    return false;
  }
}
