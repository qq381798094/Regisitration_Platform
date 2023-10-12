<template>
    <!-- 停诊信息 -->
    <div class="search-component-container">
        <div class="info">
            <h1>{{ hospitalInfo.hospitalInfo.hospital?.hosname }}停诊信息</h1>
            <el-empty description="暂无信息" />
        </div>
    </div>
</template>

<script setup lang="ts">
/* 仓库数据引入 */
import hospitalDetailStore from '@/store/modules/hospitalDetail';

/** 医院停诊信息数据获取流程 */
let hospitalInfo = hospitalDetailStore();
</script>

<style scoped lang="scss">
    .search-component-container {

        .info {
            > h1 {
                text-align: center;
                font-size: 30px;
            }
        }
    }
</style>