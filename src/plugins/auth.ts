import { author } from '@/store/authentication';
const authentication = author();

/**检测权限 */
function authPermission(permission: string): boolean {
    const all_permission = '*:*:*';
    const permissions = authentication.userPermission;
    if (permission && permission.length > 0) {
        return permissions.some(v => {
            return all_permission === v || v === permission;
        });
    } else {
        return false;
    }
}
/**检测角色 */
function authRole(role: string): boolean {
    const super_admin = 'admin';
    const roles = authentication.userRole;
    if (role && role.length > 0) {
        return roles.some(v => {
            return super_admin === v || v === role;
        });
    } else {
        return false;
    }
}

export default {
    // 验证用户是否具备某权限
    hasPermi(permission: string) {
        return authPermission(permission);
    },
    // 验证用户是否含有指定权限，只需包含其中一个
    hasPermiOr(permissions: Array<string>) {
        return permissions.some(item => {
            return authPermission(item);
        });
    },
    // 验证用户是否含有指定权限，必须全部拥有
    hasPermiAnd(permissions: Array<string>) {
        return permissions.every(item => {
            return authPermission(item);
        });
    },
    // 验证用户是否具备某角色
    hasRole(role: string) {
        return authRole(role);
    },
    // 验证用户是否含有指定角色，只需包含其中一个
    hasRoleOr(roles: Array<string>) {
        return roles.some(item => {
            return authRole(item);
        });
    },
    // 验证用户是否含有指定角色，必须全部拥有
    hasRoleAnd(roles: Array<string>) {
        return roles.every(item => {
            return authRole(item);
        });
    }
};
