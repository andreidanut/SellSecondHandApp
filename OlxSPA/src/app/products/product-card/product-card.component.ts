import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { WishList } from 'src/app/_models/wishList';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { error } from 'protractor';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    console.log(this.product.photos.length === 0);
  }

  addToWishList() {
    const wishList: WishList = {
      productId: this.product.id,
      userId: this.authService.decodedToken['nameid'],
    };

    if (!wishList.userId) {
      this.alertify.error("You must be logged in!");
    }

    if (wishList.userId != null) {
      this.userService.addwishlist(wishList).subscribe(
        (data) => {
          this.alertify.success('Added in wishlist successfully');
        },
        error => {
          console.log(error);
          this.alertify.error('You already have this item to your wishlist! ');
        }
      )
    } else {
      this.alertify.error("You must be logged in!");
    }
  }

  deleteFromWishList() {
    const wishList: WishList = {
      productId: this.product.id,
      userId: this.authService.decodedToken['nameid'],
    };
    this.userService.deleteFromWishlist(wishList).subscribe(data => {
      console.log(data);
      
    });
    // console.log(this.product.id);
  }

  onAssignProduct() {

  }
}
