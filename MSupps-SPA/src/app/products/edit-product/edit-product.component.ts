import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
  }

  updateProduct() {
    this.productService.UpdateProduct(this.product.id, this.product).subscribe(next => {
      this.alertify.success('Product updated successfully');
      this.editForm.reset(this.product);
    }, error => {
        this.alertify.error(error);
    }
    );
  }
}
