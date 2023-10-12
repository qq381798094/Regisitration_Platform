<template>
    <!-- 医院详情组件 -->
    <div class="detail-component-container">
        <!-- 头部信息 -->
        <div class="top">
            <div class="name">{{ hospitalInfo.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1693899058520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4030" width="16" height="16"><path d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z" p-id="4031" fill="#d81e06"></path></svg>
                <span>{{ hospitalInfo.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- logo与路线 -->
        <div class="logo">
            <div class="left">
                <img :src="`data:image/jpeg;base64,` + hospitalInfo.hospitalInfo.hospital?.logoData" alt="" />
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1693904075835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5238" width="16" height="16"><path d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" p-id="5239" fill="#7f7f7f"></path><path d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z" p-id="5240" fill="#7f7f7f"></path></svg>
                    <span>具体位置：{{ hospitalInfo.hospitalInfo.hospital?.param.fullAddress }}</span>
                </div>
                <div class="route">
                    规划路线：{{ hospitalInfo.hospitalInfo.hospital?.route }}
                </div>
            </div>
        </div>
        <!-- 医院介绍 -->
        <div class="footer">
            <h1>医院介绍</h1>
            <p>{{ hospitalInfo.hospitalInfo.hospital?.intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    /* 仓库数据引入 */
    import hospitalDetailStore from '@/store/modules/hospitalDetail';

    /** 医院详情信息数据获取流程 */
    let hospitalInfo = hospitalDetailStore();
</script>

<style scoped lang="scss">
    .detail-component-container{

        .top {
            display: flex;

            .name {
                font-size: 24px;
                font-weight: 900;
                height: 40px;
                line-height: 32px;
            }

            .level {
                color: #7f7f7f;
                margin-left: 10px;
                height: 40px;
                text-align: center;
                line-height: 38px;

                > span {
                    margin-left: 5px;
                }
            }
        }

        .logo {
            display: flex;
            margin: 10px 0;

            .left {
                > img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
            }

            .right {
                color: #7f7f7f;
                text-indent: 20px;
                line-height: 25px;
                margin-left: 10px;

                > div {
                    margin: 10px 0;
                }
            }
        }

        .footer {
            color: #7f7f7f;
            > p {
                text-indent: 32px;
                margin-top: 10px;
                line-height: 30px;
            }
        }
    }
</style>