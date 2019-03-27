import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-managment-item',
  templateUrl: './product-managment-item.component.html',
  styleUrls: ['./product-managment-item.component.css']
})
export class ProductManagmentItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private alertify: AlertifyService,
    private productService: ProductService,
    private router: Router) {}

  ngOnInit() {}

  deleteProduct() {
    this.productService.DeleteProduct(this.product.id).subscribe(next => {
      this.alertify.success('Product deleted successfully');
      this.router.navigate(['/home']);
    }, error => {
        this.alertify.error(error);
    }
    );
  }
}
