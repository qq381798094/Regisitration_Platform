import "../env.d.ts";   // 配置ts识别 *.vue 文件
import { createApp } from 'vue'

// 引入清除默认样式
import "@/styles/reset.scss";
// 引入根组件App
import App from '@/App.vue'
// 引入Vue-Router
import router from "@/router"
// 引入路由鉴权文件
import './permission.ts';
// 引入仓库Pinia
import Pinia from '@/store';
// 引入Element-UI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 引入全局组件
import LoginComponent from '@/components/login/index.vue';
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from '@/components/hospital_bottom/index.vue';
import VisitorView from '@/components/visitor/index.vue';

// import './style.css'
const app = createApp(App);
app.component('VisitorView', VisitorView);
app.component('LoginView', LoginComponent);
app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom);

app.use(ElementPlus, {
    locale: zhCn,
});
app.use(Pinia);
app.use(router);

app.mount("#app");
