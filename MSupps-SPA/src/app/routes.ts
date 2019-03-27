import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SearchProductComponent } from './products/search-product/search-product.component';
import { ProductByCategoryComponent } from './products/product-by-category/product-by-category.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDetailResolver } from './_resolvers/product-detail-resolver';
import { ProductListResolver } from './_resolvers/product-list-resolver';
import { ProductManagementListComponent } from './products/product-management-list/product-management-list.component';
import { UserDetailsResolver } from './_resolvers/user-details-resolver';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ManagerAuthGuard } from './_guards/manager-auth.guard';
import { ProductSearchListResolver } from './_resolvers/product-search-list-resolver';
import { ProductByCategoryListResolver } from './_resolvers/product-by-category-list-resolver';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { OrderListResolver } from './_resolvers/orders-list-resolver';
import { OrderDetailsResolver } from './_resolvers/order-details-resolver';
import { AddNewProductComponent } from './products/add-new-product/add-new-product.component';
import { PreventUnsavedAddChanges } from './_guards/prevent-unsaved-changes-add.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'manage',
    runGuardsAndResolvers: 'always',
    canActivate: [ManagerAuthGuard],
    children: [
      { path: '', component: ManagerHomeComponent },
      { path: 'users', component: MemberListComponent },
      {
        path: 'products',
        component: ProductManagementListComponent,
        resolve: { products: ProductListResolver }
      },
      {
        path: 'product/:id',
        component: EditProductComponent,
        resolve: { product: ProductDetailResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'products/add',
        component: AddNewProductComponent,
        canDeactivate: [PreventUnsavedAddChanges]
      }
    ]
  },
  {
    path: 'supplements',
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'search/:search',
        component: SearchProductComponent,
        resolve: { products: ProductSearchListResolver }
      },
      {
        path: 'category/:category',
        component: ProductByCategoryComponent,
        resolve: { products: ProductByCategoryListResolver }
      },
      {
        path: ':id',
        component: ProductDetailsComponent,
        resolve: { product: ProductDetailResolver }
      }
    ]
  },
  // protected pages
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { user: UserDetailsResolver }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        resolve: { orders: OrderListResolver }
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
        resolve: { orderedProducts: OrderDetailsResolver }
      },
      { path: 'user/:id', component: MemberListComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
