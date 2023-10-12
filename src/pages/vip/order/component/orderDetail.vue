<template>
    <div class="order-detail-component-container">
        <!-- 订单详情页面结构 -->
        <el-card class="box-card">
            <!-- 卡片头部结构 -->
            <template #header>
                <div class="card-header">
                    <span>挂号详情</span>
                </div>
            </template>
            <div class="top">
                <el-tag class="ml-2" type="success">
                    <div class="tag-box">
                        <span><el-icon><Select /></el-icon></span>
                        <span>{{ orderInfoData.param?.orderStatusString }}</span>
                    </div>
                </el-tag>
                <div class="right-info">
                    <img src="../../../../assets/images/code_app.png" alt="">
                    <div>
                        <p>微信 关注 “北京114预约挂号”</p>
                        <p>“快速预约挂号”</p>
                    </div>
                </div>
            </div>

            <!-- 订单详情底部 -->
            <div class="bottom">

                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <!-- 就诊人信息 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊人信息
                                </div>
                            </template>
                            {{ orderInfoData.patientName }}
                        </el-descriptions-item>
                        <!-- 就诊日期 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊日期</div>
                            </template>
                            {{ orderInfoData.reserveDate }}
                        </el-descriptions-item>
                        <!-- 就诊医院 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊医院</div>
                            </template>
                            {{ orderInfoData.hosname }}
                        </el-descriptions-item>
                        <!-- 就诊科室 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊科室</div>
                            </template>
                            {{ orderInfoData.depname }}
                        </el-descriptions-item>
                        <!-- 医生职称 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">医生职称</div>
                            </template>
                            {{ orderInfoData.title }}
                        </el-descriptions-item>
                        <!-- 医事服务费 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">医事服务费</div>
                            </template>
                            <span style="color: red;">{{ orderInfoData.amount }}</span>
                        </el-descriptions-item>
                        <!-- 挂号单号 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号单号</div>
                            </template>
                            {{ orderInfoData.outTradeNo }}
                        </el-descriptions-item>
                        <!-- 挂号时间 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号时间</div>
                            </template>
                            {{ orderInfoData.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="btn-box" v-if="orderInfoData.orderStatus === 0 || orderInfoData.orderStatus === 1">
                        <el-popconfirm @confirm="confrimCancelOrder" :icon="Close" title="确定取消预约?">
                            <template #reference>
                                <el-button>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button @click="openDialogClick(true)" type="primary" v-if="orderInfoData.orderStatus !== 1">支付</el-button>
                    </div>
                </div>

                <div class="right">
                    <el-card class="right-box-card">
                        <template #header>
                            <div class="right-card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <div class="attention-box">
                            <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;</p>
                            <p style="color: red;">2.【取号】就诊当天需在{{ orderInfoData.fetchTime }}前 在医院取号，未取号视为爽约，该号不退不换；</p>
                            <p>3.【退号】在{{ orderInfoData.quitTime }}前可在线退号，逾期将不可办理退号退费；</p>
                            <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>
                            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-card>

        <!-- 支付二维码的dialog结构 -->
        <el-dialog v-model="dialogVisible" title="微信支付" width="400">
            <div class="dialog-center-box">
                <img :src="imgUrl" alt="">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码登录</p>
            </div>
            <!-- 底部插槽 -->
            <template #footer>
                <el-button @click="openDialogClick(false)" type="primary">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
/** 非官方插件引入 */
// @ts-ignore
import QRCode from 'qrcode';
/** Element组件引入 */
import { Select, Close } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
/** API引入 */
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
/** 接口引入 */
import { requestGetOrderInfo, requestCancelOrder, requestQrcode } from '@/api/viper';
/** 类型约束引入 */
import { IGetOrderInfoResponseData, IOrderInfo, ICancelOrderResponseData, IQrcodeResponseData } from '@/api/viper/type.ts';

/** API实例化 */
let $route = useRoute();
onMounted(() => {
    getOrderInfo();
})

/** 支付对话框的逻辑 */
let dialogVisible = ref<boolean>(false);    //控制开启和关闭
let imgUrl = ref<string>('');   // 二维码图片
const openDialogClick = (flag:boolean) => {
    // 支付按钮，控制打开和关闭对话框
    dialogVisible.value = !dialogVisible.value;
    // 通过flag判断是哪个按钮点击的
    if(flag) {
        // 为true则是支付按钮
        getQrcode();
    } else {
        // false则是关闭窗口
        return;
    }
}


/** 就诊人信息存取逻辑 */
let orderInfoData = ref<IOrderInfo>({} as IOrderInfo);

/** 订单取消逻辑 */
const confrimCancelOrder = () => {

    // 取消预约
    cancelOrder().then(
        () => {
            getOrderInfo();
        },
        () => {
            ElMessage({
                type: 'error',
                message: '取消预约失败'
            })
        }
    )
}

/** 封装请求 */
const getOrderInfo = async () => {
    const res: IGetOrderInfoResponseData = await requestGetOrderInfo($route.query.orderId as string);
    console.log(res);
    if (res.code === 200) {
        orderInfoData.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
const cancelOrder = async () => {
    const res: ICancelOrderResponseData = await requestCancelOrder($route.query.orderId as string);
    if (res.code === 200) {
        return res.data;
    } else {
        throw new Error('无法取消预约');
    }
}
const getQrcode = async () => {
    const res: IQrcodeResponseData = await requestQrcode($route.query.orderId as string);
    if( res.code === 200 ) {
        if( res.data.codeUrl === null ) {
            ElMessage({
                type: "error",
                message: '二维码生成有误！'
            })
        } else {
            // 生成二维码图片
            imgUrl.value = await QRCode.toDataURL(res.data.codeUrl);
        }
    }
}
// const queryPayStatus = async () => {
//     const res: IPayStatusResponseData = await requestPayStatus($route.query.orderId as string);
//     console.log(res);
// }
</script>

<style scoped lang="scss">
.order-detail-component-container {

    .box-card {

        .card-header {
            color: #7f7f7f;
            font-weight: 900;
        }
    }

    .top {
        display: flex;
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        padding: 10px;

        .tag-box {
            display: flex;
            align-items: center;

            >span {
                margin: 0 3px;
            }
        }

        .right-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            >img {
                width: 40px;
                height: 40px;
            }

            >div {

                >p {
                    font-size: 12px;
                    line-height: 20px;
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 4;

            .btn-box {
                margin: 10px 0;
            }
        }

        .right {
            margin-left: 20px;
            flex: 6;

            .attention-box {
                >p {
                    line-height: 30px;
                }
            }
        }
    }

    .dialog-center-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        > img {
            width: 200px;
            height: 200px;
        }

        > p {
            line-height: 30px;
        }
    }

    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #7f7f7f;
        border-bottom: 1px solid #7f7f7f;
    }
}
</style>