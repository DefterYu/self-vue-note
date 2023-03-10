import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import pinia from './store';
import router from './router';
//全局elment样式 样式丢失时启用
// import 'element-plus/dist/index.css';

// import 'element-plus/theme-chalk/index.css';
// import "element-plus/theme-chalk/el-loading.css";
// import "element-plus/theme-chalk/el-message.css";
// import "element-plus/theme-chalk/el-notification.css";
// import "element-plus/theme-chalk/el-message-box.css";

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

//遍历icon并引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).use(pinia).mount('#app');
