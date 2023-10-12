<template>
    <div class="registration-page-container">
        <h1 class="title-tip">确认挂号信息</h1>

        <!-- 展示就诊人信息 -->
        <el-card class="visitor-card">
            <!-- 卡片头部插槽 -->
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button :icon="User" type="success" size="default" @click="goAddPatientPage">添加就诊人</el-button>
                </div>
            </template>
            <!-- 展示就诊人信息【组件】 -->
            <div class="visitor-box">
                <VisitorView
                @click="changeIndex(index)" 
                class="item" 
                v-for="(visitor,index) in visitorArr" 
                :key="visitor.id" 
                :index="index"
                :currentIndex="currentIndex"
                :visitor="visitor" />
            </div>
        </el-card>

        <!-- 展示医生信息 -->
        <el-card class="doctor-card">
            <!-- 卡片头部插槽 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 展示医生信息 -->
            <el-descriptions class="margin-top" :column="2" border>
                <!-- 就诊日期 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊日期：</div>
                    </template>
                    {{ doctorInfoArr.workDate }}
                </el-descriptions-item>
                <!-- 就诊医院 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊医院：</div>
                    </template>
                    {{ doctorInfoArr.param?.hosname }}
                </el-descriptions-item>
                <!-- 就诊科室 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊科室：</div>
                    </template>
                    {{ doctorInfoArr.param?.depname }}
                </el-descriptions-item>
                <!-- 医生姓名 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生姓名：</div>
                    </template>
                    {{ doctorInfoArr.docname === '' ? '某专家' : doctorInfoArr.docname }}
                </el-descriptions-item>
                <!-- 医生职称 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生职称：</div>
                    </template>
                    {{ doctorInfoArr.title }}
                </el-descriptions-item>
                <!-- 医生专长 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生专长：</div>
                    </template>
                    {{ doctorInfoArr.skill }}
                </el-descriptions-item>
                <!-- 医事服务费 -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医事服务费：</div>
                    </template>
                    <span style="color: red;">{{ doctorInfoArr.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 确定挂号 button -->
        <div class="btn">
            <el-button @click="submitOrderClick" type="primary" :disabled="currentIndex === -1 ? true : false">确认挂号</el-button>
        </div>

    </div>
</template>

<script setup lang="ts">
/** 获取数据接口 */
import { requestGetVisitor, requestSubmitOrder } from '@/api/viper';
import { requestDoctorSchedule } from '@/api/hospital';
/** 类型约束引入 */
import type { IVisitorInfoResponseData, TVisitorArr, ISubmitOrderResponseData } from '@/api/viper/type.ts';
import type { IDoctorInfoResponseData, IDoctorOrderData } from '@/api/hospital/type.ts';
/** API引入 */
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/** Element组件引入 */
import { User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

/** API实例化 */
let $router = useRouter();
let $route = useRoute();
onMounted(() => {
    fetchVisitorData(); // 获取就诊人信息数据
    fetchDoctorInfoData();  //获取排班医生数据
})

/** 关于就诊人信息的处理逻辑 */
let visitorArr = ref<TVisitorArr>([]);

/** 选中就诊人信息的处理 */
let currentIndex = ref<number>(-1);
const changeIndex = (index:number) => {
    currentIndex.value = index;
}

/** 关于医生信息的处理逻辑 */
let doctorInfoArr = ref<IDoctorOrderData>({} as IDoctorOrderData);

/** 提交订单逻辑 */
const submitOrderClick = () => {
    // 创建订单方法
    fetchSubmitOrderData();
}

// 点击事件 —— 跳转到新增就诊人模块
const goAddPatientPage = () => {
    $router.push({
        path: '/user/patient',
        query: {
            type: 'add'
        }
    })
}

/** 封装方法集 */
const fetchVisitorData = async () => {
    // 获取就诊人信息方法
    const res: IVisitorInfoResponseData = await requestGetVisitor()
    if(res.code === 200) {
        visitorArr.value = res.data;
    }
}
const fetchDoctorInfoData = async () => {
    // 获取医生信息方法
    const res:IDoctorInfoResponseData = await requestDoctorSchedule($route.query.docId as string);
    if(res.code === 200) {
        doctorInfoArr.value = res.data;
    }
}
const fetchSubmitOrderData = async () => {
    const res:ISubmitOrderResponseData = await requestSubmitOrder(doctorInfoArr.value.hoscode, doctorInfoArr.value.id, 197);
    console.log(res);
    if(res.code === 200) {
        $router.push({
            path: '/user/order',
            query: {
                orderId: res.data
            }
        })
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
</script>

<style scoped lang="scss">
.registration-page-container {

    .title-tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .visitor-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .visitor-box {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 5px;
            }
        }
    }

    .btn {
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }
}
</style>