export interface INewsObj {
    id?: number;
    title?: string;
    content?: string;
    source?: string;
    statu?: 0 | 1;
}
export interface ICarTypeObj {
    id: number;
    typeName: string;
}
export interface ISwitchObj {
    id: number;
    configName: string;
    statu: '0' | '1';
}
