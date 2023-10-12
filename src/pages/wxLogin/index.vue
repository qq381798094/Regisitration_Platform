<template>
    <div class="wx-login-container"></div>
</template>

<script setup lang="ts">
/** 获取用户信息逻辑 */
import { useRoute } from 'vue-router';
let $route = useRoute();
localStorage.setItem('UserInfo', JSON.stringify($route.query));
// 将当前重定向位置的页面设置为display:none;
let html: any = document.querySelector('html');
html.style.display = 'none';
</script>

<style scoped lang="scss"></style>