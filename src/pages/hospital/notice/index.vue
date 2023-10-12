<template>
    <!-- 预约通知 -->
    <div class="notice-component-container">
        <h1 class="hosname">{{ hospitalInfo.hospitalInfo.hospital?.hosname }}的预约挂号通知</h1>
        <div class="top">为方便您早日就医康复，请您认真阅读预约挂号须知：</div>
        <!-- 1 -->
        <div class="info">
            <div class="tip">一、预约实名制</div>
            <div class="text">统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号(身份证、护照)、性别、手机号码、社保卡号等基本信息。</div>
        </div>
        <!-- 2 -->
        <div class="info">
            <div class="tip">二、预约挂号</div>
            <div class="text">
                按照北京市卫健爱统一平台要求，预约括号规则如下:
                <br /><br />在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源:
                <br />在同一自然周，同一就诊人，可以预约最多8个号源;
                <br />在同一自然月，同一就诊人，可以预约最多12个号源:
                <br />在同一自然季度，同一就诊人，可以预约最多24个号源.</div>
        </div>
        <!-- 3 -->
        <div class="info">
            <div class="tip">三、取消预约</div>
            <div class="text">已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约提道进行取消预约。</div>
        </div>
        <!-- 4 -->
        <div class="info">
            <div class="tip">四、爽约处理</div>
            <div class="text">
                如预约成功后惠者来脱按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：
                <br /><br />累计奥约3次，自3次奥约日起，90天内不允许通过114平台进行预约挂号；
                <br />累计爽约6次，目6次爽约日起，180天内不允许通过114平台进行预约括号。</div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* 仓库数据引入 */
import hospitalDetailStore from '@/store/modules/hospitalDetail';

/** 医院预约信息数据获取流程 */
let hospitalInfo = hospitalDetailStore();
</script>

<style scoped lang="scss">
.notice-component-container {

    .hosname {
        text-align: center;
        font-size: 30px;
    }

    .top {
        margin: 15px 0;
        color: #7f7f7f;
    }

    .info {

        .tip {
            color: red;
            font-weight: 900;
        }

        .text {
            color: #7f7f7f;
            margin: 10px 0;
            line-height: 30px;
        }
    }
}
</style>