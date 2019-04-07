import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    registerObs = (data) => {
        return this.http.post("User/Register", JSON.stringify(data));
    }

    loginObs = (data) => {
        return this.http.post("User/Login", JSON.stringify(data));
    } 
}