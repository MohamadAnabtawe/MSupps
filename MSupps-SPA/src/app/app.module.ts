import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-Jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { TabsModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './banner/banner.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { OrdersComponent } from './orders/orders.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { appRoutes } from './routes';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberListComponent } from './members/member-list/member-list.component';

import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductByCategoryComponent } from './products/product-by-category/product-by-category.component';
import { SearchProductComponent } from './products/search-product/search-product.component';

import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDetailResolver } from './_resolvers/product-detail-resolver';
import { ProductListResolver } from './_resolvers/product-list-resolver';
import { CartElementComponent } from './cart-element/cart-element.component';
import { MemberListItemComponent } from './members/member-list-item/member-list-item.component';
import { ProductManagementListComponent } from './products/product-management-list/product-management-list.component';
import { ProductManagmentItemComponent } from './products/product-managment-item/product-managment-item.component';
import { UserDetailsResolver } from './_resolvers/user-details-resolver';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerAuthGuard } from './_guards/manager-auth.guard';
import { ProductByCategoryListResolver } from './_resolvers/product-by-category-list-resolver';
import { ProductSearchListResolver } from './_resolvers/product-search-list-resolver';
import { OrdersItemComponent } from './orders-item/orders-item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailsResolver } from './_resolvers/order-details-resolver';
import { OrderListResolver } from './_resolvers/orders-list-resolver';
import { AddNewProductComponent } from './products/add-new-product/add-new-product.component';
import { PreventUnsavedAddChanges } from './_guards/prevent-unsaved-changes-add.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    BannerComponent,
    OrdersComponent,
    AboutUsComponent,
    SearchBarComponent,
    ProfileComponent,
    MemberListComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductByCategoryComponent,
    SearchProductComponent,
    CartComponent,
    ProductDetailsComponent,
    CartElementComponent,
    MemberListItemComponent,
    ProductManagementListComponent,
    ProductManagmentItemComponent,
    EditProductComponent,
    ManagerHomeComponent,
    OrdersItemComponent,
    OrderDetailsComponent,
    AddNewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGalleryModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    PreventUnsavedAddChanges,
    UserService,
    ProductDetailResolver,
    ProductListResolver,
    UserDetailsResolver,
    OrderDetailsResolver,
    OrderListResolver,
    ProductByCategoryListResolver,
    ProductSearchListResolver,
    ManagerAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
