import { Injectable } from '@angular/core';
import { Crud } from "./crud";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private crud: Crud) {
    }

    async register(data) {//x
        try {
            return await this.crud.post("User/Register", data);
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }

    async login(data) {//x
        try {
            return await this.crud.post("User/Login", data);
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
}