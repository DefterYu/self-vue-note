// const BASE_URL = 'http://192.168.1.16:7777';
export const BASE_URL = 'https://defteryu.top:7777';
// 测试时候记得本地host添加 127.0.0.1 defteryu.top #本地前端BASE_URL转发到本地idea

// export const BASE_URL = 'http://localhost:7777';
// export const BASE_URL = 'http://defteryu.top:7777'; //阿里云后端地址+端口

/** cos图片前缀 */
export const IMG_BASE_URL =
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/';

/** cos图片上传后端接口 */
export const IMG_UP_URL = `${BASE_URL}/up`;

const moneyTypeText = {
    0: '小时',
    1: '日',
    2: '月'
};

export function getMoneyText(params: any) {
    return `￥ ${params.moneyValue}   / ${
        moneyTypeText[params.moneyType as '0' | '1' | '2']
    } `;
}
/**本地时间格式化 */
export function timeFormet(timeStr: string) {
    const date = new Date(timeStr); //时间对象
    return date.toLocaleString();
}

/**格式化get数据 */
export function urlencode(data: any, isPrefix = true) {
    isPrefix = isPrefix ? isPrefix : false;
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].includes(value)) {
            continue;
        }
        if (value.constructor === Array) {
            value.forEach(_value => {
                _result.push(
                    encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
                );
            });
        } else {
            _result.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(value)
            );
        }
    }

    return _result.length ? prefix + _result.join('&') : '';
}

import { ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';
export const openMsg = () => {
    return new Promise((resolve, reject) => {
        ElMessageBox.alert('需要重新登录', '登录过期', {
            showClose: false,
            confirmButtonText: '重新登录',
            cancelButtonText: '回到首页',
            showCancelButton: true,
            callback: (action: Action) => {
                action == 'confirm' ? resolve('确定') : reject('回到首页');
            }
        });
    });
    // return new Promise<void>((resolve, reject) => {
    //     ElMessageBox.confirm(
    //         'You have unsaved changes, save and proceed?',
    //         'Confirm',
    //         {
    //             distinguishCancelAndClose: true,
    //             confirmButtonText: 'Save',
    //             cancelButtonText: 'Discard Changes'
    //         }
    //     )
    //         .then(() => {
    //             resolve();
    //         })
    //         .catch((action: Action) => {
    //             reject(action === 'cancel' ? 'x2' : 'x1');
    //         });
    // });
};
