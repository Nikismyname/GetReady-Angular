export interface IFolderSelectData {
    name: string,
    id: number, 
    parentId: number,
    order: number,
} 

export interface IItemSelectData{
    name: string, 
    id: number,
    parentId: number,
    items: IItemForSelectData[],
    order: number,
    selected: boolean,
}

export interface IItemForSelectData{
    name: string,
    id: number,
    order: number,
    selected: boolean;
}