<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop />
    <!-- 中间组件 -->
    <div class="content">
      <router-view />
    </div>
    <!-- 底部组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <LoginView />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 中间 */
  .content {
    width: 1200px;
    margin-top: 80px;
    min-height: 700px;
  }
}
</style>
