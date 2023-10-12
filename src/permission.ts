// 路由鉴权文件
import router from './router';

// 引入仓库
import pinia from '@/store';
import userStore from '@/store/modules/user';
let userStoreInfo = userStore(pinia);

// 引入进度条
// @ts-ignore
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
// 取消加载圆球
Nprogress.configure({ showSpinner: false});

// 添加相应的全局守卫
/** 
 * 全局守卫 ： 在进入无论哪个页面，都会触发的守卫，通常用于大检查
 */

// 存放未登陆时可以访问的路径
const whiteList = ['/home', '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];

// 前置守卫
// @ts-ignore
router.beforeEach((to, from, next) => {
    // 启动进度条
    Nprogress.start();
    // 动态设置网页的标题
    document.title = `尚医通-${to.meta.title}`;
    // 获取用户登录后的本地数据，若为null则表示没有登录，有值则代表已经登录了
    let user = JSON.parse(localStorage.getItem('UserInfo') as string);
    if( user !== null ) {
        next();
    } else {
        if(whiteList.includes(to.path)) {
            next();
        } else {
            // 跳转到首页并且显示登录对话框
            next({
                path: '/home',
                query: {
                    redirect: to.fullPath
                }
            });
            userStoreInfo.loginVisible = true;
        }
    }
})

// 后置守卫
router.afterEach(() => {
    // 关闭进度条
    Nprogress.done();
})