// /**
//  * v-hasPermi 操作权限处理
//  */
export default {};

// import store from '@/store';
// import { author } from '@/store/authentication';
// const authentication = author();

// export default {
//     inserted(el, binding) {
//         const { value } = binding;
//         const all_permission = '*:*:*';
//         const permissions = authentication.userPermission;

//         if (value && value instanceof Array && value.length > 0) {
//             const permissionFlag = value;

//             const hasPermissions = permissions.some(permission => {
//                 return (
//                     all_permission === permission ||
//                     permissionFlag.includes(permission)
//                 );
//             });

//             if (!hasPermissions) {
//                 el.parentNode && el.parentNode.removeChild(el);
//             }
//         } else {
//             throw new Error(`请设置操作权限标签值`);
//         }
//     }
// };
