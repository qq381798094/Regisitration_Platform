/**
 * 对axios进行二次封装
 * 问1： 二次封装的目的是什么？
 * 答1. 利用axios自带的请求、响应拦截器功能
 *   2. 请求拦截器，一般可以在请求头中携带公共的参数：token
 *   3. 响应拦截器，可以简化服务器返回的数据， 处理http网络错误
 */
import userStore from '@/store/modules/user.ts';   //引入用户仓库
import axios from 'axios';
import { ElMessage } from 'element-plus';
// 利用axios.create创建一个axios实例
// 可以设置基础路径【baseURL】、超时的时间【timeout】的设置
// timeout为毫秒，超出设置的超时时间则会请求失败
const request = axios.create({
    baseURL: "/api",
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    /** 此处获取用户仓库 */
    let useUserStore = userStore();
    if(useUserStore.userInfo.token) {
        config.headers.token = useUserStore.userInfo.token;
    }
    // config ： 请求拦截器回调注入的对象【配置对象】，
    // 配置对象的身上最终要的一件事情header属性
    // 可以通过请求头携带公共参数 -token
    return config;
})

// 响应拦截器
request.interceptors.response.use((response) => {
    // 成功响应的回调，一般会进行简化数据 
    return response.data;
}, (error) => {
    // 处理http网络错误
    let status = error.response.status;
    switch(status) {
        case 404: 
            ElMessage({
                type: 'error',
                message: error.message
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            break;
    }
    return Promise.reject(new Error(error.message));
})

export default request;