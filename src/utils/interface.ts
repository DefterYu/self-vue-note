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
export interface IuserInfoObj {
    id: number;
    userName: string;
    status: 0 | 1;
    userType: 0 | 1;
    nickName?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
}

//覆盖elmui文件上传的响应对象 防止报错
import type { UploadFile } from 'element-plus';
export interface myUploadFile extends UploadFile {
    response: any;
}

export interface IOptions {
    value: string;
    label: string;
}
