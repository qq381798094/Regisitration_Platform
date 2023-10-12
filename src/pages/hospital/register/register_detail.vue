<template>
    <div class="register-detail-component-container">

        <!-- 顶部面包屑结构 -->
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line">|</div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdepartment">{{ workData.baseMap?.depname }}</div>
        </div>

        <!-- 中间挂号预约结构 -->
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="order-box">
                <div 
                class="item" 
                :class="{active: item.status === -1 || item.availableNumber === -1, current:item.workDate === workTime.workDate}" 
                v-for="(item, index) in workData?.bookingScheduleList" 
                @click="handleDoctorOrderClick(item)"
                :key="index">
                    <div class="item-top">{{ item?.workDate }} | {{ item?.dayOfWeek }}</div>
                    <div class="item-bottom">
                        <div v-if="item.status === -1">停止挂号</div>
                        <div v-if="item.status === 0">{{ item.availableNumber === -1 ? '无号' : '有号' }}</div>
                        <div v-if="item.status === 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination @current-change="fetchMoreData" v-model:current-page="pageCur" layout="prev, pager, next" :total="workData.total" />
        </div>

        <!-- 底部医生结构 -->
        <div class="footer">

            <!-- 即将放号的 div -->
            <div v-if="workTime.status === 1" class="future">
                <span class="footer-time">2023年xxx月xxx日</span>
                <span class="footer-time-follow">放号</span>
            </div>

            <!-- 医生排版结构 -->
            <div v-else class="doctor-box">

                <div class="morning">
                    <!-- 文字title -->
                    <div class="title-tip">
                        <svg t="1694334970647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5374" width="32" height="32"><path d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z" fill="#1296db" p-id="5375"></path></svg>
                        <span>上午号源</span>
                    </div>
                    <!-- 医生信息 -->
                    <div class="doctor-info" v-for="item in morningOrderArr" :key="item.id">
                        <div class="info-left">
                            <div>
                                <span>{{ item.title }}</span>
                                <span>|</span>
                                <span>{{ item.docname === ''? "无名氏" : item.docname }}</span>
                            </div>
                            <div>
                                {{ item.skill }}
                            </div>
                        </div>
                        <div class="info-right">
                            <div class="money">￥{{ item.amount }}</div>
                            <el-button @click="pushPageClick(item.id)" style="width: 80px;" type="primary">剩余{{ item.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>

                <div class="after">
                    <!-- 文字title -->
                    <div class="title-tip">
                        <svg t="1694335846712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6751" width="32" height="32"><path d="M166.4 712.533c-17.067-17.066-17.067-42.666 0-59.733l59.733-59.733C243.2 576 268.8 576 285.867 593.067c17.066 17.066 17.066 42.666 0 59.733l-59.734 59.733c-17.066 17.067-42.666 17.067-59.733 0z m691.2 0c-17.067 17.067-42.667 17.067-59.733 0L738.133 652.8c-17.066-17.067-17.066-42.667 0-59.733C755.2 576 780.8 576 797.867 593.067L857.6 652.8c17.067 17.067 17.067 42.667 0 59.733zM512 896c-25.6 0-42.667-17.067-42.667-42.667V768c0-25.6 17.067-42.667 42.667-42.667S554.667 742.4 554.667 768v85.333C554.667 878.933 537.6 896 512 896z m128-640H384c-25.6 0-42.667-17.067-42.667-42.667S358.4 170.667 384 170.667h256c25.6 0 42.667 17.066 42.667 42.666S665.6 256 640 256z m42.667 170.667H341.333c0 93.866 76.8 170.666 170.667 170.666s170.667-76.8 170.667-170.666z m85.333 0c0 140.8-115.2 256-256 256s-256-115.2-256-256H128c-25.6 0-42.667-17.067-42.667-42.667S102.4 341.333 128 341.333h768c25.6 0 42.667 17.067 42.667 42.667S921.6 426.667 896 426.667H768z" p-id="6752" fill="#1296db"></path></svg>
                        <span>下午号源</span>
                    </div>
                    <!-- 医生信息 -->
                    <div class="doctor-info" v-for="item in afterOrderArr" :key="item.id">
                        <div class="info-left">
                            <div>
                                <span>{{ item.title }}</span>
                                <span>|</span>
                                <span>{{ item.docname }}</span>
                            </div>
                            <div>
                                {{ item.skill }}
                            </div>
                        </div>
                        <div class="info-right">
                            <div class="money">￥{{ item.amount }}</div>
                            <el-button @click="pushPageClick(item.id)" style="width: 80px;" type="primary">剩余{{ item.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/** 组件引入 */
import { ElMessage } from 'element-plus';
/** API引入 */
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/** 接口引入 */
import { requestHospitalWork, requestHospitalDoctorOrder } from '@/api/hospital';
/** 类型约束引入 */
import { IHospitalWorkResponseData, IHospitalWorkData, IDoctorOrderResponseData, TDoctorOrderArr, IDoctorOrderData } from '@/api/hospital/type.ts';

/** API实例化 */
let $router = useRouter();
let $route = useRoute();
onMounted(() => {
    // 获取门诊挂号数据
    fetchMoreData();
})

/** 关于门诊预约挂号的数据逻辑 */
let pageCur = ref<number>(1);   // 当前页码
let limit = ref<number>(6);     // 一页多少数据
let workData = ref<IHospitalWorkData>({} as IHospitalWorkData); // 存放可预约日期的数据

/** 关于排班医生的数据逻辑 */
let workTime = ref<any>({});    //存储默认展示的排班医生数据
let doctorOrderArr = ref<TDoctorOrderArr>([]);
// 点击门诊切换排班医生数据
const handleDoctorOrderClick = (item: any) => {
    workTime.value = item;
    fetchDoctorOrderData(item.workDate);
}
// 计算出上午和下午的医生排班数据
let morningOrderArr = computed(() => {
    return doctorOrderArr.value.filter((item:IDoctorOrderData) => item.workTime === 0);
})
let afterOrderArr = computed(() => {
    return doctorOrderArr.value.filter((item:IDoctorOrderData) => item.workTime === 1);
})

/** 跳转button */
const pushPageClick = (id:string) => {
    $router.push({
        path: '/hospital/registrationPage',
        query: {
            docId: id
        }
    })
}

/** 脚本封装处【记得写注释】 */
// 将预约门诊接口数据请求封装成方法
const fetchMoreData = async () => {
    const res:IHospitalWorkResponseData = await requestHospitalWork(pageCur.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    if(res.code === 200) {
        // 存数据
        workData.value = res.data;
        // 并且存储第一天日期的数组数据
        workTime.value = res.data.bookingScheduleList[0];
        // 获取医生排班数据
        fetchDoctorOrderData(workTime.value.workDate);
    } else {
        ElMessage({
            type: 'error',
            message: '数据获取失败',
        })
    }
}
// 将请求排班医生数据的逻辑封装成方法
const fetchDoctorOrderData = async(time:string) => {
    const res: IDoctorOrderResponseData = await requestHospitalDoctorOrder($route.query.hoscode as string, $route.query.depcode as string, time);
    if(res.code === 200) {
        // 存储数据
        doctorOrderArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '排班医生数据获取失败',
        })
    }
}
</script>

<style scoped lang="scss">
    .register-detail-component-container {

        .top {
            display: flex;
            color: #7f7f7f;
            
            .line {
                width: 1px;
                height: 100%;
                margin: 0 5px;
                color: skyblue;
            }

            .dot {
                margin: 0 5px;
                color: skyblue;
            }
        }

        .center {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            .time {
                font-weight: 900;
            }

            .order-box {
                font-size: 14px;
                width: 100%;
                display: flex;
                margin: 30px 0;
                transition: all 0.5s;

                .item {
                    flex: 1;
                    border: 1px solid skyblue;
                    margin: 0 5px;

                    > .item-top {
                        font-weight: 900;
                        background: #e8f2ff;
                        height: 30px;
                        width: 100%;
                        text-align: center;
                        line-height: 30px;
                    }

                    > .item-bottom {
                        font-size: 16px;
                        width: 100%;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                    }
                }
                // 无号 + 挂满的样式
                .active {
                    border: 1px solid #ccc;
                    color: #7f7f7f;

                    > .item-top {
                        font-weight: 900;
                        background: #ccc;
                    }

                    > .item-bottom {
                        font-size: 16px;
                    }
                }
                // 当前选中
                .current {
                    transform: scale(1.05);
                }
            }
        }

        .footer {

            .future {
                text-align: center;
                font-size: 30px;
                font-weight: 900;

                > .footer-time {
                    color: skyblue;
                }

                > .footer-time-follow {
                    color: #7f7f7f;
                }
            }

            .doctor-box {

                .morning, .after {
                    // 上午title
                    .title-tip {
                        display: flex;
                        align-items: center;

                        > span {
                            margin-left: 5px;
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }

                    // 医生信息
                    .doctor-info {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        border-bottom: 1px solid #ccc;

                        .info-left {

                            > div {
                                &:nth-of-type(1) {
                                    color: skyblue;
                                    margin: 10px 0;
                                    > span {
                                        margin: 0 5px;
                                        font-size: 18x;
                                        font-weight: 900;
                                    }
                                }

                                &:nth-of-type(2) {
                                    margin: 10px 0;
                                    color: #7f7f7f;

                                }
                            }
                        }

                        .info-right {
                            width: 150px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .money {
                                color: #7f7f7f;
                                font-weight: 900;
                            }
                        }
                    }
                }

                .after{
                    margin-top: 30px;
                }
            }
        }
    }
</style>