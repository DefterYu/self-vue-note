/** cos图片前缀 */
export const IMG_BASE_URL =
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/';

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
