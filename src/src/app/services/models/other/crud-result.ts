import { Response } from "@angular/http/src/static_response";

export default class CrudResult<type>{ 
    // status: 200, data: json, json, result
    constructor(
        public status: number,
        public data: type,
        public json: string,
        public result: Response,
    ) {}
}