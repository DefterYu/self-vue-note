// const BASE_URL = 'http://192.168.1.16:7777';
// export const BASE_URL = 'http://localhost:7777';
export const BASE_URL = 'http://defteryu.top:7777'; //阿里云后端地址+端口

/** cos图片前缀 */
export const IMG_BASE_URL =
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/';

/** cos图片上传后端接口 */
export const IMG_UP_URL = `${BASE_URL}/up`;

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
