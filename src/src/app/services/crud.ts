import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

const fetchRoot = "https://localhost:44384/api/";

@Injectable()
export class Crud {
    constructor(private http: Http) {
    }

    async get(path: string, data: string = "") {
        return await this.handleResponse(
            this.http.get(fetchRoot + path + "/" + data, {
                headers: this.generateHeaders()
            }).toPromise()
        );
    }

    async post(path: string, data: object) {
        return this.handleResponse(
            this.http.post(fetchRoot + path, JSON.stringify(data), {
                headers: this.generateHeaders()
            }).toPromise()
        );
    }

    private generateHeaders(): Headers {
        let headers = new Headers();

        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        let token = localStorage.getItem("token");
        if (token !== null) {
            headers.append("Authorization", `Bearer ${token}`);
        }

        return headers;
    }

    private async handleResponse(promise: Promise<any>) {
        let result = await promise;

        let json;
        try {
            json = await result.json();
        } catch{
            json = "No Body";
        }

        if (result.status === 200) {
            return { status: 200, data: json};
        } else if (result.status === 400) {
            return { status: 400, message: json };
        } else {
            return { status: 500, result, json }
        }
    }
}