import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = {};

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.product.userId = this.authService.decodedToken['nameid'];
    this.userService.addProd(this.product).subscribe(data => {
      console.log(data);
      this.alertify.success('Successfull added item!');
    });
  }

}
