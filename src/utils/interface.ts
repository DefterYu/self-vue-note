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
export interface ICarInfoObj {
    carId: number;
    carNumber: number;
    title: string;
    carType: string;
    images: string[];
    money: {
        day?: number;
        hour?: number;
        month?: number;
    };
    remarks: string;
    isSales: number;
}
export interface ISwitchObj {
    id: number;
    configName: string;
    statu: '0' | '1';
}
