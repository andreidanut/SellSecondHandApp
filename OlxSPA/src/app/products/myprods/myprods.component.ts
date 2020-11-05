import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-myprods',
  templateUrl: './myprods.component.html',
  styleUrls: ['./myprods.component.css']
})
export class MyprodsComponent implements OnInit {

  products: any;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUserProducts( +this.authService.decodedToken['nameid'] ).subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

}
