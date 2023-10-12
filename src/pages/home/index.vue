<template>
    <!-- 首页 -->
    <div class="home-container">
        <!-- 轮播图组件 -->
        <Carousel />
        <!-- 搜索医院的表单区域 -->
        <Search />
        <!-- 展示医院的结构 -->
        <el-row gutter="20">
            <el-col :span="20">
                <!-- 等级组件 -->
                <Level @getLevel="getLevel" />
                <!-- 地区组件 -->
                <Region @getRegion="getRegion" />
                <!-- 医院Card组件 -->
                <div class="hospital-card-box" v-if="hasHospitalArr.length > 0">
                    <Card class="item" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item" />
                </div>
                <el-empty v-else description="暂无医院信息" />
                <!-- 分页器组件 -->
                <el-pagination 
                v-model:current-page="pageNo" 
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                :background="true"
                layout="prev, pager, next, jumper, ->,sizes, total" 
                :total="totalHospitalNum"
                @size-change="sizeChange"
                @current-change="currentChange" />
            </el-col>
            <el-col :span="4">
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    /* 引入API */
    import { requestHospital } from '@/api/home';
    
    /* 引入TS类型约束 */
    import type { Content, IHospitalResponseData } from '@/api/home/type';
    
    /*  引入组件  */
    import Carousel from "./carousel/index.vue";// 轮播图组件
    import Search from "./search/index.vue";// 搜索组件
    import Level from './level/index.vue';// 首页等级组件
    import Region from './region/index.vue';// 引入首页地区选择组件
    import Card from './card/index.vue';// 医院信息卡片组件
    import Tip from './tip/index.vue';

    // 引入组合式API
    import { ref, onMounted } from 'vue';

    
    /* 组件挂载后发请求 */
    onMounted(() => {
        getHospitalInfo();
    })

    /* 分页器脚本 */
    // 数据
    let pageNo = ref<number>(1);    //分页器页码
    let pageSize = ref<number>(10); // 一页显示多少条数据

    // 方法
    const currentChange = () => {
        getHospitalInfo();
    }
    const sizeChange = () => {
        pageNo.value = 1;
        getHospitalInfo();
    }
    /* ========= */

    /* 医院列表数据脚本 */
    // 存储已有的医院数据
    let hasHospitalArr = ref<Content>([]);
    let totalHospitalNum = ref<number>(0);
    let hostype = ref<string>('');
    let districtCode = ref<string>('');

    // 获取等级和地区并赋值的方法
    const getLevel = (level: string) => {
        hostype.value = level;
        getHospitalInfo();
    }
    const getRegion = (region: string) => {
        districtCode.value = region;
        getHospitalInfo();
    }
    // 获取已有医院的数据
    const getHospitalInfo = async () => {
        // 获取医院数据
        let result: IHospitalResponseData = await requestHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value);
        if(result.code === 200) {
            // 存储医院数据
            hasHospitalArr.value = result.data.content;
            totalHospitalNum.value = result.data.totalElements
        }
    }
    /* =============== */
</script>

<style scoped lang="scss">
    /* 医院卡片样式 */
    .hospital-card-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
            width: 45%;
            margin: 10px 0;
        }
    }
</style>