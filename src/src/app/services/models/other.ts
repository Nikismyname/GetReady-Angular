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

export interface IUser {

  username: string,
  
  token: string, 
  
  role: string,
  
}

export interface IUserStatus{

  isUser: boolean,
  
  isAdmin: boolean,
  
}

export interface IReorderQuestion{

  questionNumber: number; 

  reorderEvent: any;

}