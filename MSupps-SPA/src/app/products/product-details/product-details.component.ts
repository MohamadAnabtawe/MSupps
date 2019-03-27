import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { CartService } from 'src/app/_services/cart.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductCart } from 'src/app/_models/productCart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  cartId: number;
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.product.photos.length; i++) {
      imageUrls.push({
        small: this.product.photos[i].url,
        medium: this.product.photos[i].url,
        big: this.product.photos[i].url
      });
    }
    return imageUrls;
  }

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
     // check if the user is logged in
     loggedIn() {
      return this.authService.loggedIn();
    }
    isManager(): boolean {
      if (this.loggedIn()) {
        return this.authService.decodedToken.role !== '0';
      }
      return false;
    }
}
