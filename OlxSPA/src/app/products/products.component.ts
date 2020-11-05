import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';
import { Product } from '../_models/product';
import { title } from 'process';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  search = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.getProducs().subscribe((data) => {
      this.products = data;
      console.log(this.products);
      console.log(this.authService.decodedToken);
    });;

    
  }

  getProducs() {
    return this.userService.getAllProducts();
  }
}
