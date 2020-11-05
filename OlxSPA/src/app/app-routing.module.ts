import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyprodsComponent } from './products/myprods/myprods.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';
import { AuthGuard } from './_guards/auth.guard';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'add', component: ProductAddComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'myprods', component: MyprodsComponent},
    ]
  },
  {path: 'detail/:id', component: ProductDetailComponent},
  
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
