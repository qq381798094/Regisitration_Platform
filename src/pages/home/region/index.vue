<template>
    <div class="region-component-container">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li 
                @click="changeRegion('')"
                :class="{active: regionFlagRef === ''}">全部</li>
                <li 
                v-for="item in regionArrRef" 
                :key="item.value"
                :class="{active: regionFlagRef === item.value}"
                @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
/* 引入接口 */
import { requestHospitalLevelAndRegion } from "@/api/home";
/* 引入api */
import { onMounted, ref } from 'vue';
/* 引入类型检查 */
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

/** 获取地区组件逻辑脚本 */
/* API函数 */
onMounted(() => {
    getRegion()
})
let $emit = defineEmits(['getRegion']);

/* 变量部分部分 */
let regionArrRef = ref<HospitalLevelAndRegionArr>([]);//保存地区数据
let regionFlagRef = ref<string>('');

/* 方法部分 */
// 获取地区数据
const getRegion = async () => {
    const res:HospitalLevelAndRegionResponseData = await requestHospitalLevelAndRegion('Beijin');
    if( res.code === 200 ) {
        regionArrRef.value = res.data;
    }
}
// 更改地区高亮块
const changeRegion = (value: string) => {
    regionFlagRef.value = value;
    $emit('getRegion', value);
}
</script>

<style scoped lang="scss">
.region-component-container {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            width: 52px;
            margin-right: 10px;
        }

        >ul {
            display: flex;
            flex-wrap: wrap;

            >li {
                cursor: pointer;
                margin-right: 10px;
                margin-bottom: 10px;

                &.active {
                    color: #55a6fe;
                }

                &:hover {
                    color: #55a6fe;
                }
            }
        }
    }
}
</style>