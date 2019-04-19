import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterData } from './models/others/register-data';
import { ILoginData } from './models/others/login-data';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient) {
    }

    registerObs = (data: IRegisterData) => { 
        return this.http.post<void>("User/Register", JSON.stringify(data));
    }

    loginObs = (data: ILoginData) => {
        return this.http.post<void>("User/Login", JSON.stringify(data));
    }
}