<template>
    <div class="hospital-container">
        <!-- 左侧导航区 -->
        <div class="menu">
            <!-- 首页 -->
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/ 医院信息</span>
            </div>

            <el-menu 
            router="true"
            :default-active="$route.path" 
            class="el-menu-vertical-demo"
            @select="menuSelect">

                <el-menu-item index="/hospital/register">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区 -->
        <div class="content">
            <!-- 子组件结构展示 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">  
    /* 引入合集 */
    import {HomeFilled, Document, Warning, Calendar, Search, Bell} from '@element-plus/icons-vue'
    /* 公用API引入 */
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import hospitalDetailStore from '@/store/modules/hospitalDetail';
    /* 公用API实例化 */
    // 获取route对象
    let $route = useRoute();
    let $router = useRouter();
    // 获取仓库对象
    let detailStore = hospitalDetailStore();
    
    onMounted(() => {
        /**  使用仓库获取接口数据合集 */
        // 请求医院详情数据
        detailStore.getHospitalDetail($route.query.hoscode as string);
        // 请求医院详情中的科室数据
        detailStore.getHospitalDetailDepartment($route.query.hoscode as string)
    })
    /** 普通方法合集 */
    const menuSelect = (index: any) => {
    // Menu组件的@select方法，解决路由跳转不带参数容易丢失数据问题
        $router.push({
            path: index,
            query: {
                hoscode: $route.query.hoscode
            }
        })
    }
</script>

<style scoped lang="scss">
    .hospital-container {
        display: flex;

        .menu {
            flex: 2;
            display: flex;
            flex-direction: column;
            align-items: center;

            .top {
                color: #7f7f7f;
            }
        }

        .content {
            flex: 8;
        }
    }
</style>