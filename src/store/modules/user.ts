// 定义一个仓库
import { defineStore } from 'pinia';
// 引入接口
import { requestUserLoginCode, requestUserLogin } from '@/api/user';
// 引入State类型约束
import type { IUserState } from '@/store/modules/interface/index';
// 引入User类型约束
import type { ILoginData, IUserLoginResponseData, IUserInfo } from '@/api/user/types';


const userStore = defineStore('User', {
    state: ():IUserState => {
        return {
            loginVisible: false,    // 控制Dialog的 显示/隐藏
            userInfo: JSON.parse(localStorage.getItem('UserInfo') as string) || ({} as IUserInfo),  // 用户信息存储
            code: '',   // 获得验证码
        }
    },
    actions: {
        // 获取验证码方法
        async getCode(phone:string) {
            const res:any = await requestUserLoginCode(phone);
            
            if(res.code === 200) {
                this.code = res.data;
                return 'ok';
            } else {
                return Promise.reject(new Error(res.message));
            }
        },
        // 用户手机号码登录的方法
        async userLogin(data: ILoginData) {
            const res:IUserLoginResponseData = await requestUserLogin(data);
            if(res.code === 200) {
                this.userInfo = res.data
                // 数据本地化存储
                localStorage.setItem('UserInfo', JSON.stringify(this.userInfo));
                // 返回一个成功的Promise
                return 'ok';
            } else {
                return Promise.reject(new Error(res.message));
            }
        },
        // 退出登录方法
        removeUserInfo() {
            // 清空仓库用户信息
            this.userInfo = {
                name: '',
                token: ''
            };
            // 清空本地数据
            localStorage.removeItem('UserInfo');
        },
        // 查询微信扫码结果：查询本地数据是否有数据
        queryLoginData() {
            // 定时器，隔一段时间检查是否已经存储了信息
            let timer = setInterval(() => {
                if(localStorage.getItem('UserInfo')) {
                    // 扫码成功
                    this.loginVisible = false;
                    this.userInfo = JSON.parse(localStorage.getItem('UserInfo') as string);
                    clearInterval(timer);
                }
            },1000)
        },
    },
    getters: {}
})

export default userStore;