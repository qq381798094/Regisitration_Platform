<template>
    <!-- 预约挂号组件 -->
    <div class="register-component-container">
        <div class="top">
            <div class="title">{{ detailObj.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1693899058520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4030" width="16" height="16"><path d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z" p-id="4031" fill="#d81e06"></path></svg>
                <span>{{ detailObj.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 展示内容区域 -->
        <div class="content">
            <div class="left">
                <img :src="`data:image/jpeg;base64,${detailObj.hospitalInfo.hospital?.logoData}`" alt="" />
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    预约周期：10天   放号周期：{{ detailObj.hospitalInfo.bookingRule?.releaseTime }}   停挂时间：{{ detailObj.hospitalInfo.bookingRule?.stopTime }}
                </div>
                <div class="address">
                    具体位置：{{ detailObj.hospitalInfo.hospital?.param.fullAddress }}
                </div>
                <div class="route">
                    具体路线：{{ detailObj.hospitalInfo.hospital?.route }}
                </div>
                <div class="release-time">
                    退号时间：就诊前一工作日{{ detailObj.hospitalInfo.bookingRule?.quitTime }}前取消
                </div>
                <div class="ruler">预约挂号规则</div>
                <div class="ruler-info" v-for="(item, index) in detailObj.hospitalInfo.bookingRule?.rule" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
        <!-- 放置医院科室组件 -->
        <div class="department-content">
            <div class="left-nav">
                <ul>
                    <li 
                    @click="changeActiveClick(index)"
                    :class="{active: index === currentIndex}" 
                    v-for="(item, index) in detailObj.hospitalInfoDeparmentArr" 
                    :key="item.depcode">{{ item.depname }}</li>
                </ul>
            </div>
            <div class="department-info">
                <!-- 大科室 -->
                <div class="show-department" v-for="item in detailObj.hospitalInfoDeparmentArr" :key="item.depcode">
                    <h1 class="cur">{{ item.depname }}</h1>
                    <!-- 小科室 -->
                    <ul>
                        <li @click="enterRoomDetail(child)" v-for="child in item.children" :key="child.depcode">
                            {{ child.depname }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    /**  引入API */
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    /* 仓库数据引入 */
    import hospitalDetailStore from '@/store/modules/hospitalDetail';
    // import useUserStore from '@/store/modules/user';
    /** 实例化API */
    let $route = useRoute();
    let $router = useRouter();

    /** 医院详情信息数据获取流程 */
    let detailObj = hospitalDetailStore();
    // let userStore = useUserStore();

    /** 脚本数据存放 */
    // 控制小科室高亮块的脚本
    let currentIndex = ref<number>(0);
    const changeActiveClick = (index: number) => {
        currentIndex.value = index;
        // 点击时右侧科室滚动脚本
        /** 知识点 scrollIntoView({}) */
        const curH1 = document.getElementsByClassName('cur');
        curH1[currentIndex.value].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    /** 进入小科室的详情页面逻辑 */
    const enterRoomDetail = (item: any) => {
        // 弹出用户登录Dialog
        // userStore.loginVisible = true;

        // 跳转到小科室详情页
        console.log(item);
        $router.push({
            path: '/hospital/registerDetail',
            query: {
                hoscode: $route.query.hoscode,
                depcode: item.depcode,
            }
        })
    }
    
</script>

<style scoped lang="scss">
    .register-component-container {

        .top {
            display: flex;

            .title {
                font-size: 24px;
                font-weight: 900;
                height: 40px;
                line-height: 32px;
            }

            .level {
                color: #7f7f7f;
                margin-left: 10px;
                height: 40px;
                text-align: center;
                line-height: 38px;

                > span {
                    margin-left: 5px;
                }
            }
        }

        .content {
            display: flex;
            margin-top: 20px;

            .left {
                width: 80px;

                > img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
            }

            .right {
                flex: 1;
                font-size: 14px;
                margin-left: 20px;

                .time, .address, .route, .release-time, .ruler-info {
                    margin-top: 10px;
                    color: #7f7f7f;
                    line-height: 20px;
                }

                .ruler {
                    margin: 10px 0;
                }
            }
        }

        .department-content {
            width: 100%;
            height: 500px;
            display: flex;
            margin-top: 20px;

            .left-nav {
                width: 80px;
                height: 100%;
                
                > ul {
                    width: 100%;
                    height: 100%;
                    background: rgb(248, 248, 248);
                    display: flex;
                    flex-direction: column;
                    
                    li {
                        cursor: pointer;
                        line-height: 41px;
                        flex: 1;
                        text-align: center;
                        color: #7f7f7f;
                        font-size: 14px;

                        &.active {
                            border-left: 2px solid red;
                            color: red;
                            background: white;
                        }
                    }
                }
            }

            .department-info {
                flex: 1;
                margin-left: 20px;
                height: 100%;
                overflow: auto;
                &::-webkit-scrollbar {
                    display: none;
                }

                .show-department {
                    
                    > h1 {
                        background-color: rgb(248, 248, 248);
                        color: #7f7f7f;
                    }

                    > ul {
                        display: flex;
                        flex-wrap: wrap;

                        > li {
                            cursor: pointer;
                            width: 33%;
                            color: #7f7f7f;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>