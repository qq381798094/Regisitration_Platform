<template>
    <div class="hospital-top-container">
        <div class="content">
            <!-- 左侧 -->
            <div class="left" @click="goHome">
                <img alt="" src="../../assets/images/logo.png" />
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <!-- 有用户名显示用户信息  || 没有则 显示 登陆注册 -->
                <p v-if="!userStore.userInfo.name" class="login" @click="showLoginClick">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link" style="cursor: pointer;">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/** 引入Element组件 */
import { ArrowDown } from '@element-plus/icons-vue'
/** 仓库数据使用 */
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
/* 引入API */
import { useRouter } from 'vue-router';
/* 实例化API对象 */
let $router = useRouter();

/** 用户可选菜单跳转 */
const goUser = (path: string) => {
    $router.push({
        path: path
    })
}

/* 方法 */
const goHome = () => {
    // 回到首页
    $router.push({ path: '/' });
}
const showLoginClick = () => {
    // 点击进行用户登录方法
    userStore.loginVisible = true;
}
const loginOut = () => {
    // 退出登录方法
    userStore.removeUserInfo(); // 通知仓库清除用户信息
    $router.replace({path: '/'});   // 重定向
}
</script>

<style scoped lang="scss">
.hospital-top-container {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 70px;
        background: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            >img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            >p {
                font-size: 20px;
                color: #55a6fe;
            }
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #999;

            .help {
                margin-right: 10px;
            }

            .login {
                cursor: pointer;
            }
        }
    }
}
</style>