import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: User = {};

  constructor(public authService :AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.user).subscribe(data => {
      console.log(data['token']);
      this.authService.saveToken(data['token']);
      this.alertify.success('Logged in successfully');
    });
  }

  onLogout() {
    this.authService.logout();
    this.alertify.success('Logged out successfully');
  }

}
