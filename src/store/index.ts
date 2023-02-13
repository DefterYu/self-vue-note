import { createPinia } from 'pinia';

//引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

//使用pinia持久化插件
pinia.use(piniaPluginPersistedstate);

//对外导出用于main导入pinia实例
export default pinia;
