<template>
    <div class="all-order-component-container">
        <!-- 全部订单结构 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 20px;">挂号订单</span>
                </div>
            </template>

            <!-- 提供用户选择的下拉菜单 -->
            <el-form :inline="true">
                <!-- 就诊人下拉 -->
                <el-form-item label="就诊人">
                    <el-select placeholder="请选择就诊人" v-model="patientId" @change="filterTableData">
                        <el-option label="请选择全部就诊人" value=""></el-option>
                        <el-option v-for="item in allPatientArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 订单状态下拉 -->
                <el-form-item label="订单状态">
                    <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="filterTableData">
                        <el-option label="全部订单" value=""></el-option>
                        <el-option v-for="(item, index) in allOrderStateArr" :key="index" :label="item.comment" :value="item.status"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <!-- 表格 -->
            <el-table :data="orderArr" style="width: 100%;margin: 15px 0;">
                <el-table-column prop="reserveDate" label="就诊时间" />
                <el-table-column prop="hosname" label="医院" />
                <el-table-column prop="depname" label="科室" />
                <el-table-column prop="title" label="医生" />
                <el-table-column prop="amount" label="服务费" />
                <el-table-column prop="patientName" label="就诊人" />
                <el-table-column prop="param.orderStatusString" label="订单状态" />
                <el-table-column prop="address" label="操作">
                    <template #="{ row }">
                        <el-button type="text" @click="goDetailPage(row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination 
            v-model:current-page="pageNo" 
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" 
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total" 
            :total="totalRef" 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
/** Element 引入 */
import { ElMessage } from 'element-plus';
/** API引入 */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
/** 请求接口引入 */
import { requestPageOrder, requestAllPatient, requestAllOrderState } from '@/api/viper';
/** 类型约束引入 */
import type { IOrderTableResponseData, TOrderTableRecordsArr, 
            IPatientResponseData, IAllOrderStateResponseData,
            TAllOrderStateArr, TPatientDataArr } from '@/api/viper/type.ts';


/** API 实例化 */
onMounted(() => {
    requestOrderTableData();    //获取订单表格数据
    requestAllPaitentData();    //获取所有就诊人信息
    requestAllOrderStateData(); //获取所有订单状态信息
})
let $router = useRouter();

/** 就诊人信息数据 */
let patientId = ref<string>('');    //就诊人id
let allPatientArr = ref<TPatientDataArr>([]);   //存储全部病人信息

/** 订单信息数据 */
let orderStatus = ref<string>('');  // 订单状态
let allOrderStateArr = ref<TAllOrderStateArr>([]);  // 存储全部订单状态
let orderArr = ref<TOrderTableRecordsArr>([] as TOrderTableRecordsArr); // 存储表格数据
let totalRef = ref<number>(0);  // 存储总数据条数
// 前往订单详情界面点击事件 
const goDetailPage = (row:any) => {
    $router.push({
        path: '/user/order',
        query: {
            orderId: row.id
        }
    });
}


/** 分页器数据 + 方法集 */
let pageNo = ref<number>(1);    //当前多少页
let pageSize = ref<number>(10);     // 一页多少数据
// 点击页码重新请求数据
const handleCurrentChange = (page:number) => {
    pageNo.value = page;
    // 重新获取订单表格数据
    requestOrderTableData();
}
// 分页器下拉菜单数据方法请求
const handleSizeChange = (size:number) => {
    pageSize.value = size;
    // 重新获取订单表格数据
    requestOrderTableData();
}

/** API方法合集 */
// 下拉菜单API
const filterTableData = () => {
    requestOrderTableData();    // 重新获取表格数据
}

/** 封装的请求方法 */
const requestOrderTableData = async () => {
    const res:IOrderTableResponseData = await requestPageOrder(pageNo.value, pageSize.value, patientId.value, orderStatus.value);
    if(res.code === 200) {
        orderArr.value = res.data.records;
        totalRef.value = res.data.total;
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
const requestAllPaitentData = async () => {
    const res: IPatientResponseData = await requestAllPatient();
    if(res.code === 200) {
        allPatientArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
const requestAllOrderStateData = async () => {
    const res:IAllOrderStateResponseData = await requestAllOrderState();
    if(res.code === 200) {
        allOrderStateArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
</script>

<style scoped lang="scss">
.all-order-component-container {}
</style>