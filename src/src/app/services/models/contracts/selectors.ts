export interface IFolderSelectData {
    name: string,
    id: number, 
    parentId: number,
    order: number,
} 

export interface IQuestionsSelectData{
    name: string, 
    id: number,
    parentId: number,
    items: IQuestionForSelectData[],
    order: number,
}

export interface IQuestionForSelectData{
    name: string,
    id: number,
    order: number,
}