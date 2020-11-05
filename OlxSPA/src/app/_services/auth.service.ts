import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    token: string;
    decodedToken: any;
    jwtHandler = new JwtHelperService();
    baseUrl = environment.ApiUrl;

    constructor( private http: HttpClient ){}

    login(user: User) {
        return this.http.post<Observable<User>>(this.baseUrl + 'auth/login', user);
    }

    logout() {
        localStorage.removeItem('token');
    }

    saveToken(token: string){
        localStorage.setItem('token', token);
    }

    isLogged() {
        this.token = localStorage.getItem('token');
        this.decodedToken = this.jwtHandler.decodeToken(this.token);
        if (this.token){
            return true;
        }
        return false;
    }

}