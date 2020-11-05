import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from 'angular-gallery';
import { Product } from 'src/app/_models/product';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  prodId: number;
  photo = { path: '' };
  photos = [];

  constructor(private gallery: Gallery,
              private activeRoute: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.prodId = this.activeRoute.snapshot.params['id'];
    this.userService.getProductById(this.prodId).subscribe(data => {
      this.product = data;
      console.log(this.product);
      this.photos = this.product.photos;
      console.log(this.photos);
    });
    
  }

  showGallery(index: number) {
    console.log(this.product.photos.length !== 0);
    if (this.product.photos.length !== 0){
      let prop = {
          images: this.photos
          , index };
      this.gallery.load(prop);
    }
  }


}
