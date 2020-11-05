import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { IvyGalleryModule } from 'angular-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MyprodsComponent } from './products/myprods/myprods.component';
import { ErrorInterceptorProv } from './_interceptors/error.interceptor';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [		
    AppComponent,
    HomeComponent,
    NavComponent,
    ProductsComponent,
    WishlistComponent,
    ProductCardComponent,
    WishlistComponent,
    MyprodsComponent,
    ProductAddComponent,
    SearchPipePipe,
    ProductDetailComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IvyGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
    // RouterModule.forRoot(appRoutes),
  ],
  providers: [ErrorInterceptorProv],
  bootstrap: [AppComponent]
})
export class AppModule { }
