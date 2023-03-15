/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */

import store from '@/store';
import { author } from '@/store/authentication';
const authentication = author();

export default {
    inserted(el, binding) {
        const { value } = binding;
        const super_admin = 'admin';
        const roles = authentication.userRole;

        if (value && value instanceof Array && value.length > 0) {
            const roleFlag = value;

            const hasRole = roles.some(role => {
                return super_admin === role || roleFlag.includes(role);
            });

            if (!hasRole) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`请设置角色权限标签值"`);
        }
    }
};
