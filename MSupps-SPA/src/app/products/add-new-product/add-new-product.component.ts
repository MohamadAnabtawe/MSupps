import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  @ViewChild('addForm') addForm: NgForm;
  model: any = {};
  productId: number;
  photo: any = {};
  secondaryPhotosUrl: string;
  mainPhotoUrl: string;
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.secondaryPhotosUrl = '';
    this.mainPhotoUrl = '';
  }
  addProduct() {
    this.productService.AddProduct(this.model).subscribe(
      product => {
        this.productId = product.id;
        this.addProductPhotos();
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addProductPhotos() {
    const secondaryPhotosUrlArray = this.secondaryPhotosUrl.split(',');
    this.photo.url = this.mainPhotoUrl;
    this.photo.isMain = 1;
    this.photo.productId = this.productId;
    this.productService.AddProductPhoto(this.photo).subscribe(
      () => {},
      error => {
        this.alertify.error(error);
        return;
      }
    );
    for (let i = 0; i < secondaryPhotosUrlArray.length; i++) {
      this.photo.url = secondaryPhotosUrlArray[i];
      this.photo.isMain = 0;
      this.photo.productId = this.productId;
      this.productService.AddProductPhoto(this.photo).subscribe(
        () => {},
        error => {
          this.alertify.error(error);
          return;
        }
      );
    }
    this.alertify.success('Added successfully');
  }
}
