export interface IButtonsRenderInformation { 
    type: string,
    buttons: IButtonRenderInformation[],
}

export interface IButtonRenderInformation { 
    name: string, 
    function: (...params: any[]) => any, 
    styles: string,
}