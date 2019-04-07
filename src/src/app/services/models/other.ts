import { Response } from "@angular/http/src/static_response";

export class CrudResult<type>{ 
    // status: 200, data: json, json, result
    constructor(
        public status: number,
        public data: type,
        public json: string,
        public result: Response,
    ) {}
}

export class ParsingData {
    constructor(
      public text: string,
      public done: boolean,
      public type: string,
    ) { }
}

export class FormInputData {
  constructor(
    public name: string,
    public displayName: string,
    public type: string,
    public data: any = null,
    public validations: any[] = [],
    public messages: {} = {},
    public placeholder: string = "",
    public errors: object = {},
    ) { }
}

export class FormData { 
  constructor(
    public inputData: FormInputData[],
    public formName: string,
    public submitButtonName: string = "Submit",
    public shouldDisplayMappings: boolean = false,
    public isDisabled: boolean = false,
  ) {
  }
}

export class User { 
  constructor(
    public username: string,
    public token: string, 
    public role: string,
  ) {
  }
}