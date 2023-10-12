<template>
    <div class="search-component-container">
        <el-autocomplete 
        v-model="hosname" 
        :trigger-on-focus="false"
        :fetch-suggestions="fetchData" 
        clearable 
        class="inline-input w-50"
        placeholder="请输入医院名称" 
        @select="goDetail" />
        <el-button 
        type="primary" 
        size="default" 
        :icon="Search"></el-button>
    </div>
</template>

<script setup lang="ts">
    /* import合集处 */
    // 引入icon组件
    import { Search } from '@element-plus/icons-vue';
    // 引入API组件
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    // 引入接口
    import { requestHospitalInfo } from '@/api/home';
    // 引入类型约束
    import type { IHospitalInfo } from '@/api/home/type';


    /* 《模糊搜索获取数据集合》逻辑点 */
    // 数据
    let $router = useRouter();
    let hosname = ref<string>('');


    // 方法
    const goDetail = (item:any) => {
    // 可以点一个搜索列表并跳转
        console.log(item);
        $router.push({path: '/hospital/register'}) //跳转代码
    }
    const fetchData = async (queryString: string, callback: any) => {   
    // 带有防抖节流、获取输入的关键字以及有回调函数的一个万能方法
        const res:IHospitalInfo = await requestHospitalInfo(queryString);
        // 使用map()遍历每一项，然后返回一个新的对象【数组】
        const valueRes = res.data.map((item) => {
            return { value: item.hosname }
        })
        callback(valueRes);
    }
</script>

<style scoped lang="scss">
    .search-component-container {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        /* 深度选择器修改组件样式 */
        ::v-deep(.el-input__wrapper) {
            width: 600px;
            margin-right: 10px;
        }
    }
</style>