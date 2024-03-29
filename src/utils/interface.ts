export interface INewsVO {
    id?: number;
    title?: string;
    content?: string;
    source?: string;
    statu?: 0 | 1;
    nickName?: string;
}
export interface ICarTypeObj {
    id: number;
    typeName: string;
}
export interface IBugObj {
    id: number;
    userId: number;
    nickName: string;
    statu: string;
    detail: string;
    phone: string;
}
export interface ICarInfoObj {
    carId: number;
    carNumber: number;
    title: string;
    carType: string;
    images: string[] | [];
    moneyType: string;
    moneyValue: number;
    remarks: string;
    isSales: number;
    isComment: string;
}
export interface IReviewPO {
    id: number;
    carId: number;
    userId: number;
    orderId: number;
    score: number;
    remarks: string;
    createTime: string;
    isAnonymous: '0' | '1';
    avatar?: string;
    nickName?: string;
}
export interface ISwitchObj {
    id: number;
    configName: string;
    statu: '0' | '1';
}
export interface IOrderObj {
    id: number | string;
    carId: number | string;
    title: string;
    userId: 12;
    nickName: string;
    isRetrun: '0' | '1';
    payStatu: '0' | '1';
    createTime: string;
    payTime: string;
    moneyValue: number;
    moneyType: '0' | '1' | '2';
    spend: number;
    isComment: '0' | '1';
}
export interface ICollectionObj {
    id: number;
    userId: string;
    carId: number;
    title: string;
}
export interface IReviewAdd {
    remarks: string;
    score: number;
    carId: number;
    userId: number;
    orderId: number;
    isAnonymous: '0' | '1';
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

export interface IForm {
    title: string;
    remarks: string;
    carType: string;
    moneyType: string;
    carNumber: number;
    moneyValue: number;
    images?: string[];
}
export interface IRole {
    id?: number;
    name: string;
    roleKey: string;
    status: string;
    delFlag?: number;
    remark?: string;
    createTime?: string;
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
