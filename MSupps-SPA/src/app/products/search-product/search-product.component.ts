import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchBarComponent } from 'src/app/search-bar/search-bar.component';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  products: Product[];
  searchString: string;
  private sub: any;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data['products'];
    });
    this.sub = this.route.params.subscribe(params => {
      this.searchString = params['search'];
    });
  }

  isEmpty(): boolean {
    return this.products.length === 0;
  }
}
