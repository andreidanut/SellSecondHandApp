import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userService.isOnWishList = true;
    
    this.subscription = this.userService.productsUpdate.subscribe(() => {
      this.getAllProducts();
    });

    this.getAllProducts();
    
  }

  getAllProducts() {
    this.userService.getUserWishlist().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  ngOnDestroy() {
    this.userService.isOnWishList = false;
    this.subscription.unsubscribe();
  }

}
