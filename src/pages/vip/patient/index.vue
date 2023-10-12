<template>
    <div class="patient-component-container">
        <!-- 就诊人管理组件结构 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>就诊人管理</span>
                    <el-button @click="handleAddVisitorClick(1)" :icon="User" class="button"
                        type="success">添加就诊人</el-button>
                </div>
            </template>
            <!-- 底部 -->
            <div v-if="switchSence === 0" class="visitor-box">
                <!-- 展示就诊人列表页面 -->
                <VisitorView 
                @removePatient="removePatient"
                @changeScene="changeScene" 
                class="item" 
                v-for="(visitor, index) in visitorsArr"
                :key="visitor.id" 
                :index="index" 
                :visitor="visitor" />
            </div>
            <div v-if="switchSence === 1" class="add-form-box">
                <!-- 展示添加就诊人页面 -->
                <el-divider content-position="left">就诊人信息</el-divider>
                <!-- 就诊人基础信息form -->
                <el-form :rules="rules" style="width: 60%;margin: 10px auto;" label-width="90">
                    <!-- 用户姓名 -->
                    <el-form-item label="用户姓名" prop="name">
                        <el-input v-model="addPatientParams.name" placeholder="请输入用户姓名" />
                    </el-form-item>
                    <!-- 证件类型 -->
                    <el-form-item label="证件类型" prop="certificatesType">
                        <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="addPatientParams.certificatesType">
                            <el-option v-for="item in certificatesArr" :key="item.id" :label="item.name"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <!-- 证件号码 -->
                    <el-form-item label="证件号码" prop="certificatesNo">
                        <el-input placeholder="请输入证件号码" v-model="addPatientParams.certificatesNo" />
                    </el-form-item>
                    <!-- 用户性别 -->
                    <el-form-item label="用户性别" prop="sex">
                        <el-radio-group v-model="addPatientParams.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 出生日期 -->
                    <el-form-item label="出生日期" prop="birthdate">
                        <el-date-picker v-model="addPatientParams.birthdate" value-format="YYYY-MM-DD" type="date"
                            placeholder="请选择出生日期" />
                    </el-form-item>
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="phone">
                        <el-input placeholder="请输入手机号码" v-model="addPatientParams.phone" />
                    </el-form-item>
                </el-form>

                <el-divider content-position="left">建档信息(完善后部分医院首次就诊不排队建档)</el-divider>
                <!-- 就诊人建档信息部分 -->
                <el-form :rules="rules" style="width: 60%;margin: 10px auto;" label-width="90">
                    <!-- 婚姻状况 -->
                    <el-form-item label="婚姻状况" prop="isMarry">
                        <el-radio-group v-model="addPatientParams.isMarry">
                            <el-radio :label="0">未婚</el-radio>
                            <el-radio :label="1">已婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 自费/医保 -->
                    <el-form-item label="自费/医保" prop="isInsure">
                        <el-radio-group v-model="addPatientParams.isInsure">
                            <el-radio :label="0">自费</el-radio>
                            <el-radio :label="1">医保</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 当前住址 -->
                    <el-form-item label="当前住址" prop="addressSelected">
                        <el-cascader :props="regionProps" style="width: 100%;" v-model="addPatientParams.addressSelected" />
                    </el-form-item>
                    <!-- 详细地址 -->
                    <el-form-item label="详细地址" prop="address">
                        <el-input placeholder="请输入详细地址" v-model=addPatientParams.address />
                    </el-form-item>
                </el-form>

                <el-divider content-position="left">联系人信息(选填)</el-divider>
                <!-- 就诊人联系人信息部分 -->
                <el-form :rules="rules" style="width: 60%;margin: 10px auto;" label-width="90">
                    <!-- 用户姓名 -->
                    <el-form-item label="用户姓名" prop="contactsName">
                        <el-input placeholder="请输入用户姓名" v-model="addPatientParams.contactsName" />
                    </el-form-item>
                    <!-- 证件类型 -->
                    <el-form-item label="证件类型" prop="contactsCertificatesType">
                        <el-select placeholder="请选择证件类型" style="width: 100%;"
                            v-model="addPatientParams.contactsCertificatesType">
                            <el-option v-for="item in certificatesArr" :key="item.id" :value="item.value"
                                :label="item.name" />
                        </el-select>
                    </el-form-item>
                    <!-- 证件号码 -->
                    <el-form-item label="证件号码" prop="contactsCertificatesNo">
                        <el-input placeholder="请输入证件号码" v-model="addPatientParams.contactsCertificatesNo" />
                    </el-form-item>
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="contactsPhone">
                        <el-input placeholder="请输入手机号码" v-model="addPatientParams.contactsPhone" />
                    </el-form-item>
                    <!-- 提交/重写 -->
                    <el-form-item>
                        <el-button @click="handleFormSubmitClick" type="primary" size="default">提交</el-button>
                        <el-button @click="handleFormResetClick" size="default">重写</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
/** 引入Element组件 */
import { User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
/** 引入Vue API */
import { onMounted, ref, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/** 引入接口 */
import { requestGetVisitor } from '@/api/viper';
import { requestCertificateType, requestCityData } from '@/api/user';
import { requestAddOrUpdatePatient } from '@/api/patient';
/** 引入类型约束 */
import type { IVisitorInfoResponseData, TVisitorArr } from '@/api/viper/type.ts';
import type { ICertificatesTypeResponseData, TCertificatesTypeArr, ICityDataResponseData } from '@/api/user/types.ts';
import type { IAddOrUpdataPatient } from '@/api/patient/type.ts';
import type { CascaderProps } from 'element-plus';


/** API实例化 */
let $route = useRoute();
let $router = useRouter();
onMounted(() => {
    // 获取就诊人信息
    requestAllVisitorFunc();
    // 获取证件类型数据
    requestCetificationFunc();
    // 先获取路由信息判断type值 ： 为add则是新增    为edit则是修改
    if ($route.query.type === 'add') {
        switchSence.value = 1;
    }
    if($route.query.type === 'edit') {
        switchSence.value = 1;
    }
})

/** 控制div的显示开关 */
let switchSence = ref<number>(0);

/** 就诊人信息数据集合 */
let visitorsArr = ref<TVisitorArr>([]);     //存储就诊人数据列表
let certificatesArr = ref<TCertificatesTypeArr>([]);    //存储证件类型数据
// 存储新增就诊人的对象数据
let addPatientParams = reactive<IAddOrUpdataPatient>({
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
})

/** 通过watch监听数据 */
watch(() => visitorsArr.value, () => {
    // 一旦该数据发生变化，则利用传入的id值找到对应的数组元素【对象】
    if($route.query.type === 'edit') {
        // 必然有id值
        let userInfo = visitorsArr.value.find((item:any) => String(item.id) === $route.query.id);
        // 给form表单赋值
        Object.assign(addPatientParams, userInfo);
    }
})

/** 地区选择器的JS逻辑 */
const regionProps: CascaderProps = {
    lazy: true,
    async lazyLoad(node: any, resolve: any) {
        // node.data —— 携带的是点击item的showData对象属性【id、label、value、leaf】
        // resolve —— 回调方法，用于挂载数据
        const res: ICityDataResponseData = await requestCityData(node.data.id || 86);
        let showData = res.data.map((item) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren,
            }
        })
        // 注入数据
        resolve(showData);
    }
}

/** 自定义校验规则 */
// 通用
// @ts-ignore
const validatorCurrent = (rule:any, value:any, callback:any) => {
    if(value) {
        callback();
    } else {
        callback('该选项不能为空!');
    }
}
// 姓名
// @ts-ignore
const validatorName = (rule:any, value:any, callback:any) => {
    let reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
    if(value !== '' && reg.test(value)) {
        callback();
    } else {
        callback('请输入正确格式的姓名!');
    }
}
// 证件号
// @ts-ignore
const validatorCertificatesNo = (rule:any, value:any, callback:any) => {
    let idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let homeCardReg = /^\d{9}$/;
    if(idCardReg.test(value) || homeCardReg.test(value)) {
        callback();
    } else {
        callback('请输入正确格式的证件号码!');
    }
}
// 手机
// @ts-ignore
const validatorPhone = (rule:any, value:any, callback:any) => {
    let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if(phoneReg.test(value)) {
        callback();
    } else {
        callback('请输入正确格式的手机号码!');
    }
}
let rules = {
    name: [{required: true, trigger: 'blur', validator: validatorName}],
    certificatesType: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    certificatesNo: [{required: true, trigger: 'blur', validator: validatorCertificatesNo}],
    sex: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    birthdate: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    phone: [{required: true, trigger: 'blur', validator: validatorPhone}],
    isMarry: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    isInsure: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    addressSelected: [{required: true, trigger: 'change', validator: validatorCurrent}],
    address: [{required: true, trigger: 'blur', validator: validatorCurrent}],
    contactsName: [{trigger: 'blur'}],
    contactsCertificatesType: [{trigger: 'blur'}],
    contactsCertificatesNo: [{trigger: 'blur'}],
    contactsPhone: [{trigger: 'blur'}]
}

/** 方法封装 */
// VisitorView组件的自定义方法
// 编辑按钮点击事件 —— 会传值到表单信息中
const changeScene = (user:IAddOrUpdataPatient) => {
    // 点击切换到修改就诊人信息页面展示
    switchSence.value = 1;
    // 将子组件的值传过来赋值在表单数据中
    Object.assign(addPatientParams, user);
}
// 子组件的删除行为反馈事件
const removePatient = () => {
    // 重新获取一下所有就诊人信息
    requestAllVisitorFunc();
}

// 点击事件方法
const handleAddVisitorClick = (value: number) => {
    // 清空用户信息对象
    resetInfo();
    // 点击切换展示页面
    switchSence.value = value;
}
const handleFormSubmitClick = () => {
    // 表单提交事件
    requestAddOrUpdatePatientFunc(addPatientParams).then(
        (config) => {
            // 提示添加成功
            ElMessage({
                type: 'success',
                message: config
            })
            // 重新获取就诊人
            requestAllVisitorFunc();

            if ($route.query.type) {
                // 回跳到上一个界面
                $router.back();
            } else {
                // 跳转到另一个展示界面
                switchSence.value = 0;
            }
        },
        () => {
            ElMessage({
                type: 'error',
                message: '添加失败!'
            })
        }
    )
}
const handleFormResetClick = () => {
    // 清空表单数据点击事件
    resetInfo();
    // 提示
    ElMessage({
        type: 'success',
        message: '已成功清除！'
    })
}

// 公共方法
const resetInfo = () => {
    // 专用于清空用户输入的表单信息
    Object.assign(addPatientParams, {
        id: null,
        name: '',
        certificatesType: '',
        certificatesNo: '',
        sex: 0,
        birthdate: '',
        phone: '',
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: '',
        contactsName: '',
        contactsCertificatesType: '',
        contactsCertificatesNo: '',
        contactsPhone: ''
    })
}

// 接口请求方法
const requestAllVisitorFunc = async () => {
    // 请求就诊人列表数据
    const res: IVisitorInfoResponseData = await requestGetVisitor();
    if (res.code === 200) {
        visitorsArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
const requestCetificationFunc = async () => {
    // 请求证件类型数据
    const res: ICertificatesTypeResponseData = await requestCertificateType();
    if (res.code === 200) {
        certificatesArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '证件获取失败'
        })
    }
}
const requestAddOrUpdatePatientFunc = async (data: IAddOrUpdataPatient) => {
    let res: any = await requestAddOrUpdatePatient(data);
    if (res.code === 200) {
        return data.id ? '更新成功!' : '新增成功!';
    } else {
        throw new Error();
    }
}
</script>

<style scoped lang="scss">
.patient-component-container {

    // 卡片头部
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .visitor-box {
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 32%;
            margin: 5px;

        }
    }
}
</style>