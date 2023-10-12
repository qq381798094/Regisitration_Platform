<template>
    <div class="order-component-container">
        <!-- 无订单id时显示的页面 -->
        <div v-if="!$route.query.orderId" class="no-order-id-content">
            <AllOrderView />
        </div>
        <!-- 有订单id时显示的页面 -->
        <div v-else class="has-order-id-content">
            <OrderDetailView />
        </div>
    </div>
</template>

<script setup lang="ts">
    /** API 引入 */
    import { useRoute } from 'vue-router';
    /** 标签组件引入 */
    import AllOrderView from './component/allOrder.vue';
    import OrderDetailView from './component/orderDetail.vue';
    /** API实例化 */
    let $route = useRoute(); 
</script>

<style scoped lang="scss">
    .order-component-container {

    }
</style>