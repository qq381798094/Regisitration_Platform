<template>
    <div class="vip-page-container">
        <!-- 左：显示导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon><HomeFilled /></el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu
            router
            default-active="/user/certification" 
            class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification">
                    <el-icon><Postcard /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order">
                    <el-icon><Memo /></el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient">
                    <el-icon><User /></el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile">
                    <el-icon><Document /></el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback">
                    <el-icon><ChatLineRound /></el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右：展示会员中心二级路由组件区域 -->
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
    /** Element 组件引入 */
    import { HomeFilled, Postcard, Memo, User, Document, ChatLineRound } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.vip-page-container {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content {
        flex: 8;
    }
}
</style>