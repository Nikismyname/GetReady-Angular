export interface IScopedData<T = any>{
    data: T,
    global: boolean,
};