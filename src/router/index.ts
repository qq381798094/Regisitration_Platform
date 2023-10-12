import { createRouter, createWebHashHistory } from "vue-router";
import routes from './routes';

export default createRouter({
    history: createWebHashHistory(),
    routes: routes,
    // 滚动行为： 控制滚动条的位置
    scrollBehavior() {
        return {
            left : 0,
            top: 0
        }
    }
})