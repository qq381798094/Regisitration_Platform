<template>
    <div class="carousel-component-container">
        <!-- 轮播图 -->
        <el-carousel height="350px">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../../assets//images//web-banner-1.png" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
    img {
        width: 100%;
        height: 350px;
    }
</style>