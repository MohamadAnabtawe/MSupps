import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseUrl + 'products/category/' + category
    );
  }

  SearchProducts(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products/search/' + search);
  }

  AddProduct(model: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products/add', model);
  }

  AddProductPhoto(model: any) {
    return this.http.post(this.baseUrl + 'products/photo/add', model);
  }
  UpdateProduct(id: number, product: Product) {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }
  DeleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }
}
