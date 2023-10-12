<template>
    <div class="level-component-container">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital-ul">
                <li
                @click="changeLevel('')" 
                :class="{active: activeFlagRef === ''}">全部</li>
                <li 
                v-for="item in levelArrRef" 
                :key="item.value"
                :class="{active: activeFlagRef === item.value}"
                @click="changeLevel(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
/* 引入接口 */
import { requestHospitalLevelAndRegion } from '@/api/home';
/* 引入API */
import { onMounted, ref } from 'vue';
/* 引入TS类型检查 */
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type';
/** API使用 */
onMounted(() => {
    // 获取医院等级
    getLevel()
})
let $emit = defineEmits(['getLevel']);
/** 获取医院等级模块 */
let levelArrRef = ref<HospitalLevelAndRegionArr>([]);
let activeFlagRef = ref<string>('0');   //控制高亮色

// 改变高亮块
const changeLevel = (level: string) => {
    activeFlagRef.value = level;
    $emit('getLevel', level);
}
// 获取等级数据
const getLevel = async () => {
    const res: HospitalLevelAndRegionResponseData = await requestHospitalLevelAndRegion('HosType');
    levelArrRef.value = res.data;
}
</script>

<style scoped lang="scss">
.level-component-container {
    color: #7f7f7f;

    >h1 {
        font-weight: 900;
        margin: 10px 0px;
    }

    .content {
        display: flex;

        .left {
            margin-right: 10px;
        }

        .hospital-ul {
            display: flex;

            >li {
                cursor: pointer;
                margin-right: 10px;

                &.active {
                    color: #55a6fe;
                }

                &:hover {
                    color: #55a6fe;
                }
            }
        }
    }
}</style>