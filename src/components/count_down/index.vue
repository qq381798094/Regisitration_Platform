<template>
    <div class="count-down-component-container">
        获取验证码({{ time }}s)
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    let time = ref<number>(5);
    let props = defineProps(['flag']);
    let $emit = defineEmits(['setFlag']);
    /** watch方法？？？ */
    watch(() => props.flag, () => {
        // 每隔一秒数值-1
        let timer = setInterval(() => {
            time.value--;
            if( time.value == 0) {
                // 通知父组件倒计时结束
                $emit('setFlag', false);
                // 清除定时器
                clearInterval(timer);
            }
        }, 1000)
    },
    {
        immediate: true
    })
</script>

<style scoped lang="scss">
    .count-down-component-container {

    }
</style>