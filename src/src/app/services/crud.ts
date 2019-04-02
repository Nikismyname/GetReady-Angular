import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { CrudResult } from './models/other';
import { Response } from "@angular/http/src/static_response";

const fetchRoot = "https://localhost:44384/api/";

@Injectable()
export class CrudObs {
    constructor(private http: Http) {
    }

    get(path: string, data) {
        return this.http.get(fetchRoot + path + "/" + data, { headers: generateHeaders() });
    } 

    post(path: string, data) {
        return this.http.post(fetchRoot + path, JSON.stringify(data), { headers: generateHeaders() });
    }
}

@Injectable()
export class Crud {
    constructor(private http: Http) {
    }

    async get<type>(path: string, data: string = "") {
        return await this.handleResponse<type>(
            this.http.get(fetchRoot + path + "/" + data, {
                headers: generateHeaders()
            }).toPromise()
        );
    }

    async post<type>(path: string, data: object) {
        return this.handleResponse<type>(
            this.http.post(fetchRoot + path, JSON.stringify(data), {
                headers: generateHeaders()
            }).toPromise()
        );
    }

    private async handleResponse<type>(promise: Promise<Response>): Promise<CrudResult<type>> {
        let result = await promise;

        let json;
        try {
            json = await result.json();
        } catch{
            json = "No Body";
        }

        return new CrudResult<type>(result.status, json, json, result);
    }
}

function generateHeaders(): Headers {
    let headers = new Headers();

    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let token = localStorage.getItem("token");
    if (token !== null) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    return headers;
}