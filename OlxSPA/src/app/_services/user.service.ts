import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { WishList } from '../_models/wishList';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    
    wishProds: Product[] = [];
    productsUpdate = new Subject<void>();

    isOnWishList = false;
    baseUrl = environment.ApiUrl;

    constructor(private http: HttpClient,
                private authService: AuthService) { }

    getAllProducts() {
        return this.http.get<[]>(this.baseUrl + 'user/products');
        // .pipe(
        //     tap(() => {
        //         this.productsUpdate.next();
        //     })
        // );
    }

    getUserProducts(id: number) {
        return this.http.get(this.baseUrl + 'user/userproducts/' + id);
    }

    getProductById(id: number) {
        return this.http.get(this.baseUrl + 'user/product/' + id);
    }

    addwishlist(wishList: WishList) {
        return this.http.post<WishList>(this.baseUrl + 'user/addwishlist', wishList);
    }

    addProd(product: Product) {
        return this.http.post<Product>(this.baseUrl + 'user/addprod', product);
    }

    getUserWishlist() {
        return this.http.get<Product[]>(this.baseUrl + 'user/wishlist/' +  this.authService.decodedToken['nameid']);
    }

    deleteFromWishlist(wish: WishList) {
        return this.http.post(this.baseUrl + 'user/delfromwish/' + this.authService.decodedToken['nameid'], wish).pipe(
            tap(() => {
                this.productsUpdate.next();
            })
        );
        
    }
}
