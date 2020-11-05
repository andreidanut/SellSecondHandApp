import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OlxSPA';

  isLogged: boolean;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();

    // const customObservable = new Observable((observer) => { //           Custom observable pentru a intelege observables mai bine 
    //   let count = 0;
    //   setInterval(() => {
    //     if(count == 5) {
    //       observer.error();
    //     }
    //     observer.next(count);
    //     count++;
    //   }, 1000);
    // });

    // customObservable.pipe(
    //   map( (data: number) => {
    //     data = data * 2;
    //     console.log(data);
    //   } )
    // ).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log("CEVAAAA");
    // });
  }
}
