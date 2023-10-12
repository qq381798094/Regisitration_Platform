<template>
    <div class="certification-component-container">
        <!-- 实名认证组件 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <h1>实名信息</h1>
                </div>
            </template>
            <!-- 实名认证提示部分 -->
            <div class="tip">
                <p>
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
                </p>
            </div>

            <!-- 底部认证成功的结构 -->
            <el-descriptions v-if="userInfoObj.authStatus === 1" class="margin-top" :column="1" border
                style="margin: 20px auto;">
                <!-- 用户姓名 -->
                <el-descriptions-item label-align="center" width="30">
                    <template #label>
                        <div class="cell-item">用户姓名</div>
                    </template>
                    {{ userInfoObj.name }}
                </el-descriptions-item>
                <!-- 证件类型 -->
                <el-descriptions-item label-align="center" width="30">
                    <template #label>
                        <div class="cell-item">证件类型</div>
                    </template>
                    {{ userInfoObj.certificatesType === '10' ? '身份证' : '户口本' }}
                </el-descriptions-item>
                <!-- 证件号码 -->
                <el-descriptions-item label-align="center" width="30">
                    <template #label>
                        <div class="cell-item">证件号码</div>
                    </template>
                    {{ userInfoObj.certificatesNo }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 底部认证未成功的结构 -->
            <el-form ref="form" :rules="rules" :model="userParamsReact" v-else style="width: 60%;margin:20px auto;"
                label-width="80">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="userParamsReact.name" placeholder="请输入用户姓名" />
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select v-model="userParamsReact.certificatesType" style="width: 100%;" placeholder="请选择证件类型">
                        <el-option v-for="(item, index) in certificatesTypeArr" :key="index" :label="item.name"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input v-model="userParamsReact.certificatesNo" placeholder="请输入证件号码" />
                </el-form-item>
                <el-form-item label="上传证件" prop="certificatesUrl">
                    <el-upload ref="uploadRefs" :on-remove="removeImgHandle" :on-preview="previewImgHandle"
                        :on-success="uploadSuccessHandle" :on-exceed="exceedHandle" :limit="1" list-type="picture-card"
                        action="/api/oss/file/fileUpload?fileHost=userAuah">
                        <img style="width: 100%;height: 100%;" src="../../../assets/images/auth_example.png" alt="">
                    </el-upload>

                    <el-dialog v-model="dialogVisible">
                        <img v-if="userParamsReact.certificatesUrl" style="width: 100%;height: 100%;" w-full
                            :src="userParamsReact.certificatesUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitBtnHandle" type="primary">提交</el-button>
                    <el-button @click="resetBtnHandle">重写</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
/** API导入 */
import { onMounted, ref, reactive } from 'vue';
/** Element 组件引入 */
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
/** 接口导入 */
import { requestUserInfo, requestCertificateType, requestUserCertificate } from '@/api/user';
/** 类型约束导入 */
import type {
    IUserDetailInfoResponseData, IUserDetailInfo,
    ICertificatesTypeResponseData, TCertificatesTypeArr, UserParams
} from '@/api/user/types.ts';

/** API实例化 */
onMounted(() => {
    // 获取用户信息
    requestUserInfoFunc();
    // 获取证件类型
    requestCertificatesTypeFunc();
})

/** API变量数据存放处 */
let dialogVisible = ref<boolean>(false);    //控制对话框的显示与隐藏
let uploadRefs = ref(); //对应的是<upload>标签的ref属性

/** 存储用户信息逻辑 */
let userInfoObj = ref<IUserDetailInfo>({} as IUserDetailInfo);  //存储用户信息
let certificatesTypeArr = ref<TCertificatesTypeArr>([]);    //存储证件类型

/** 表单数据 */
let form = ref();
let userParamsReact = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
})
// 提交点击事件
const submitBtnHandle = () => {

    form.value.validate().then(
        // 返回的是一个boolean
        () => {
            requestUserCertificateFunc().then(
                (config) => {
                    ElMessage({
                        type: 'success',
                        message: config,
                    })
                    // 再次获取用户信息
                    requestUserInfoFunc();
                },
                () => {
                    ElMessage({
                        type: 'error',
                        message: '认证失败'
                    })
                }
            )
        },
        // 返回的是一个Object
        () => {
            return;
        }
    )
}
// 重写点击事件
const resetBtnHandle = () => {
    // 清空数据
    Object.assign(userParamsReact, {
        certificatesNo: '',
        certificatesType: '',
        certificatesUrl: '',
        name: ''
    })
    // 调用外部方法清空图片列表
    uploadRefs.value.clearFiles();
}

/** 表单验证规则 */
// 自定义的用户姓名校验规则 —— name
// @ts-ignore
const validatorName = (rule: any, value: any, callback: any) => {
    const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的姓名格式！'));
    }
}
// 自定义的证件类型校验规则 —— certificatesType
// @ts-ignore
const validatorType = (rule: any, value: any, callback: any) => {
    if (value === '10' || value === '20') {
        callback();
    } else {
        callback(new Error('请选择证件类型！'));
    }
}
// 自定义的证件号码校验规则 —— certificatesNo
// @ts-ignore
const validatorNo = (rule: any, value: any, callback: any) => {
    const regIdCard: any = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const regHomeBook: any = /^\d{9}$/;
    if (regIdCard.test(value) || regHomeBook.test(value)) {
        callback();
    } else {
        callback(new Error('身份证号码或户口本号码格式有误！'));
    }
}
// 自定义证件照校验规则 —— certificatesUrl
// @ts-ignore
const validatorUrl = (rule: any, value: any, callback: any) => {
    if (value.length) {
        callback();
    } else {
        callback(new Error('请上传相应的证件照图片'));
    }
}

const rules = {
    name: [{ required: true, validator: validatorName, }],
    certificatesType: [{ required: true, validator: validatorType }],
    certificatesNo: [{ required: true, validator: validatorNo }],
    certificatesUrl: [{ required: true, validator: validatorUrl }]
}


/** API函数 */
const exceedHandle = () => {
    // 上传图片超出限制数量时执行的函数
    ElMessage({
        type: 'error',
        message: '图片上传失败！'
    })
}
// @ts-ignore
const uploadSuccessHandle = (response: any, uploadFile: any, uploadFiles: any) => {
    // 成功上传图片时触发该函数
    // 1. response 是服务器返回的接口数据
    userParamsReact.certificatesUrl = response.data;
    // 清除校验结果
    form.value.clearValidate('certificatesUrl');
}
// @ts-ignore
const previewImgHandle = (uploadFile: any) => {
    // 照片预览触发该函数
    dialogVisible.value = !dialogVisible.value;
}
const removeImgHandle = () => {
    // 移除当前图片时触发该函数
    userParamsReact.certificatesUrl = '';
}

/** 封装函数 */
const requestUserInfoFunc = async () => {
    const res: IUserDetailInfoResponseData = await requestUserInfo();
    if (res.code === 200) {
        userInfoObj.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.message,
        })
    }
}
const requestCertificatesTypeFunc = async () => {
    const res: ICertificatesTypeResponseData = await requestCertificateType();
    if (res.code === 200) {
        certificatesTypeArr.value = res.data;
    }
}
const requestUserCertificateFunc = async () => {
    const res: any = await requestUserCertificate(userParamsReact);
    if (res.code === 200) {
        return '认证成功!';
    } else {
        throw new Error(res.message);
    }
}
</script>

<style scoped lang="scss">
.certification-component-container {

    .box-card {}

    .tip {
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #7f7f7f;
    }

    .margin-top {
        padding: 0 150px;
    }
}
</style>