<template>
    <div class="login-container">
        <!-- v-model —— 控制 dialog 显示/隐藏 -->
        <el-dialog v-model="userStore.loginVisible" title="用户登录" @close="closeDialog(false)">
            <el-row>
                <!-- 左侧结构 -->
                <el-col :span="12">
                    <div class="login-in">
                        <!-- 手机 + 验证码 -->
                        <div v-show="loginWay">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input v-model="loginParam.phone" placeholder="请输入手机号码"
                                        :prefix-icon="User"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input v-model="loginParam.code" placeholder="请输入手机验证码"
                                        :prefix-icon="Lock"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || countFlag" @click="getCode">
                                        <CountDown @setFlag="setFlag" :flag="countFlag" v-if="countFlag" />
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button :disabled="isPhone && loginParam.code.length === 6 ? false : true"
                                style="width: 100%;" type="primary" size="default" @click="loginInClick">用户登录</el-button>
                            <!-- 登录按钮 -->
                            <div class="bottom-box" @click="changeLoginWayClick(true)">
                                <p>微信扫码登录</p>
                                <svg t="1694051703426" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4038" width="32" height="32">
                                    <path
                                        d="M0 512c0 282.77 229.23 512 512 512s512-229.23 512-512S794.77 0 512 0 0 229.23 0 512z"
                                        fill="#2BA246" p-id="4039"></path>
                                    <path
                                        d="M636.826 400.742c7.889 0.06 15.768 0.556 23.603 1.485C639.283 303.616 533.914 230.4 413.594 230.4c-134.452 0-244.634 91.648-244.634 208.077 0 67.174 36.66 122.368 97.894 165.222l-24.473 73.575 85.299-42.855c30.72 5.99 55.142 12.237 85.658 12.237 7.68 0 15.36-0.358 22.784-0.922a183.45 183.45 0 0 1-7.527-51.2c0.307-107.008 92.058-193.792 208.23-193.792z m-131.482-66.56a30.72 30.72 0 1 1 0 61.133c-18.278 0-36.71-12.288-36.71-30.72s18.33-30.157 36.71-30.157v-0.256z m-171.213 61.39c-18.38 0-36.864-12.289-36.864-30.72 0-18.433 18.483-30.72 36.864-30.72 16.966 0 30.72 13.753 30.72 30.72 0 16.965-13.754 30.72-30.72 30.72z"
                                        fill="#FFFFFF" p-id="4040"></path>
                                    <path
                                        d="M652.34 413.952c-116.43 0-208.078 79.77-208.078 177.51 0 97.741 91.648 177.51 208.077 177.51 24.371 0 48.947-6.092 73.37-12.236l67.123 36.864-18.38-61.44c49.1-36.864 85.708-85.76 85.708-140.902 0-97.588-97.894-177.306-207.82-177.306z m-67.482 146.893c-13.517 0-24.474-10.957-24.474-24.474 0-13.516 10.957-24.473 24.474-24.473 18.585 0 30.72 12.288 30.72 24.473 0 12.186-12.135 24.474-30.72 24.474z m134.553 0c-13.516 0-24.473-10.957-24.473-24.474 0-13.516 10.957-24.473 24.473-24.473 18.381 0 30.72 12.288 30.72 24.473 0 12.186-12.339 24.474-30.72 24.474z"
                                        fill="#FFFFFF" p-id="4041"></path>
                                </svg>
                            </div>
                        </div>
                        <!-- 微信扫码 -->
                        <div class="weChat-box" v-show="!loginWay">
                            <div id="weChat-content"></div>
                            <div class="phone-change" @click="changeLoginWayClick(false)">
                                <p>手机短信验证码登录</p>
                                <svg t="1694316049411" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4233" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4234"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                <!-- 右侧结构 -->
                <el-col :span="12">
                    <div class="right-content">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="">
                                <svg t="1694052127703" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="10387" width="16" height="16">
                                    <path
                                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                        fill="#5D5D5D" p-id="10388"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <svg t="1694052060973" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="9153" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="9154"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>
                        </div>
                    </div>

                    <p class="tip">尚医通官方指定平台</p>
                    <p class="tip">快速挂号 安全放心</p>

                </el-col>
            </el-row>

            <template #footer>
                <el-button @click="closeDialog(true)" type="primary" size="default">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
/** 接口引入 */
import { requestWxLogin } from '@/api/user';
/** 类型约束引入 */
import { IWxLoginResponseData } from '@/api/user/types.ts';
/** 组件引入 */
import CountDown from '../count_down/index.vue';
/** Vue的API引用 */
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter} from 'vue-router';
/** Element组件引用 */
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
/** 仓库数据使用 */
import useUserStore from '@/store/modules/user';

let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();

// 单个控制变量
var scanFlag = ref<boolean>(false); //用于证明当前是扫码登陆状态

/** 自定义校验规则变量 */
// @ts-ignore
const validatorPhone = (rule: any, value: any, callback: any) => {
    // 自定义手机号码校验规则方法
    /**
     * 1. rule: 表单校验规则对象
     * 2. value: 即为当前文本的内容
     * 3. callback: 回调函数
     */
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的手机号码格式'));
    }
}
// @ts-ignore
const validatorCode = (rule: any, value: any, callback: any) => {
    if (/^\d{6}$/.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的验证码格式'));
    }
}

/** 表单校验规则 */
const rules = {
    /** 一般校验 */
    // // 手机号码校验规则
    // phone: [{ required: true, message: '手机号码务必11位', trigger: 'change', min: 11}],
    // // 验证码校验规则
    // code: [{required: true, message: '验证码务必是6位', trigger: 'blur', min: 6}]

    /** 自定义校验规则 ： 属性：validator */
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}

/** 控制用户登录方式切换的逻辑 */
let loginWay = ref<boolean>(true);
const changeLoginWayClick = async (bool: boolean) => {
    // 根据变量切换登录方式
    loginWay.value = !loginWay.value;

    if (bool) {
        scanFlag.value = true;
        // 切换为微信扫码登录界面
        // 发送请求获取微信二维码
        let redirect_uri = encodeURIComponent(window.location.origin + '/wxlogin');  // 将当前域名进行编码
        const res: IWxLoginResponseData = await requestWxLogin(redirect_uri);
        // 生成微信登录的二维码页面
        // @ts-ignore
        new WxLogin({
            self_redirect: true,
            id: 'weChat-content',
            appid: res.data.appid,
            scope: res.data.scope,
            redirect_uri: res.data.redirectUri,
            state: res.data.state,
            style: 'black',
            href: ''
        })
    } else {
        // 切换为手机验证码登录界面
        scanFlag.value = false;
    }
}

/** 微信二维码登录遗留逻辑 */
// 通过watch监听本地存储是否有值从而判断是否已经登录
watch(() => scanFlag.value, (val:boolean) => {
    if(val) {
        // 则为扫码登录状态
        userStore.queryLoginData();
    }
})

/** 用户通过输入手机号码获取验证码的逻辑 */
let loginParam = reactive({
    phone: '',
    code: ''
})
let isPhone = computed(() => {
    // 手机正则
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    // test()返回布尔值
    const res: boolean = reg.test(loginParam.phone);
    return res;
})
const getCode = async () => {
    // 开启验证码倒计时
    countFlag.value = true;
    // 获取验证码方法，通过仓库取验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (error) {
        // 获取验证码失败
    }
}

/** 获取验证码组件倒计时逻辑  */
let countFlag = ref<boolean>(false);    // true：为倒计时组件
const setFlag = (flag: boolean) => {
    // 倒计时为0时，通知父组件倒计时组件隐藏
    countFlag.value = flag;
}

/** 用户点击登录按钮逻辑 */
let form = ref<any>();  // 表单校验ref变量
const loginInClick = async () => {
    // 该语句保证表单校验是正确的
    await form.value.validate();

    // 发起登录请求
    userStore.userLogin(loginParam).then(
        () => {
            // 登录请求成功
            userStore.loginVisible = false;  // 关闭对话框
            // 额外判断： 判断$route.query.redirect是否有参数
            // 有参数则代表是别处跳转过来登录的，没参数则是代表在当前页面登录的
            if( $route.query.redirect ) {
                // 有则跳转到原来的位置
                $router.push( $route.query.redirect as string );
            }
        },
        (error) => {
            // 登录请求失败
            ElMessage({
                type: 'error',
                message: (error as Error).message,
            })
        })
}

/** 用户点击关闭登录窗口的逻辑 */
const closeDialog = (bool: boolean) => {
    // 清空用户输入的对象
    Object.assign(loginParam, { phone: '', code: '' });
    // 清空表单验证的结果
    form.value.resetFields();

    if (bool) {
        // 为真则是底部的关闭窗口按钮
        userStore.loginVisible = !userStore.loginVisible;
    } else {
        // 为假则是右上方的x按钮
        return;
    }
}
</script>


<style scoped lang="scss">
.login-container {

    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login-in {
        border: 1px solid #ccc;
        padding: 20px;

        // 微信扫码登录
        .weChat-box {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone-change {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;

                >p {
                    margin: 10px 0;
                }
            }
        }

        .bottom-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;

            >p {
                margin: 10px 0;
            }
        }
    }

    .right-content {

        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                >img {
                    width: 130px;
                    height: 130px;
                }

                >p {
                    margin: 5px 0;
                }
            }
        }
    }

    .tip {
        font-style: italic;
        text-align: center;
        margin: 20px 0;
        font-size: 20px;
        font-weight: 900;
    }
}</style>