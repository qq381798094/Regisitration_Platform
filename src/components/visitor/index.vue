<template>
    <!-- 就诊人组件 -->
    <div class="visible-component-container">

        <div class="top">
            <div class="left">
                <span class="protect-span">{{ visitor.isInsure === 1 ? '医保' : '自费' }}</span>
                <span class="user-name-span">{{ visitor.name }}</span>
            </div>
            <div class="right">
                <el-button circle size="default" type="primary" :icon="Edit" @click="handleChangeClick"></el-button>
                <el-popconfirm 
                width="200" 
                confirm-button-text="确定" 
                @confirm="exeConfrimEvent"
                cancel-button-text="取消"
                :title="`你确定要删除${visitor.name}吗?`">
                    <template #reference>
                        <el-button v-if="$route.path === '/user/patient'" circle size="default" type="danger"
                        :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>
                    
            </div>
        </div>

        <div class="bottom">
            <p>证件类型：{{ visitor.param.certificatesTypeString }}</p>
            <p>证件号码：{{ visitor.certificatesNo }}</p>
            <p>用户性别：{{ visitor.sex === 0 ? '女' : '男' }}</p>
            <p>出生日期：{{ visitor.birthdate }}</p>
            <p>手机号码：{{ visitor.phone }}</p>
            <p>婚姻状况：{{ visitor.isMarry === 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址：{{ visitor.param.cityString }}</p>
            <p>详细地址：{{ visitor.param.fullAddress }}</p>

            <!-- 已选择该盒子 -->
            <transition name="confirm">
                <div class="confirm-box" v-if="index === currentIndex">已选择</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
/** ElemeDelete, nt组件引入 */
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
/** 接口引入 */
import { requestDeletePatient } from '@/api/patient';
/** API引入 */
import { useRoute, useRouter } from 'vue-router';
/** API实例化 */
let $route = useRoute();
let $router = useRouter();
let $emit = defineEmits(['changeScene','removePatient']);
/** 父子组件传值 */
let props = defineProps(['visitor', 'index', 'currentIndex']);

/** 点击事件 */
const handleChangeClick = () => {
    // 判断是 预约挂号 的点击事件、还是 就诊人管理 的点击事件
    if ($route.path === '/user/patient') {
        // 就诊人管理 —— 不用跳转，触发向父组件抛出的事件
        $emit('changeScene', props.visitor);
    } else {
        // 预约挂号 —— 需要路由跳转
        $router.push({
            path: '/user/patient',
            query: {
                type: 'edit',
                id: props.visitor.id
            }
        })
    }
}
// 气泡确认框的确定按钮点击事件
const exeConfrimEvent = () => {
    requestDeletePatientFunc().then(
        (config)=>{
            ElMessage({
                type:'success',
                message: config
            })
            // 重新获取一下数据
            $emit('removePatient');
        }, 
        ()=> {
            ElMessage({
                type: 'error',
                message: '删除失败!',
            })
        }
    )
}

/** 数据请求方法 */
const requestDeletePatientFunc = async () => {
    const res:any = await requestDeletePatient(props.visitor.id);
    if(res.code === 200 && res.data) {
        return '删除成功!';
    } else {
        throw new Error();
    }
}
</script>

<style scoped lang="scss">
.visible-component-container {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        background: #e5e5e5;

        .left {

            .protect-span {
                background: #fff;
                padding: 3px;
                font-size: 12px;
                margin-right: 5px;
                border-radius: 5px;
            }

            .user-name-span {
                color: #7f7f7f;
            }
        }
    }

    .bottom {
        position: relative;
        padding-left: 50px;

        >p {
            line-height: 40px;
        }

        .confirm-box {
            position: absolute;
            left: 20%;
            top: 20%;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            font-weight: 900;
            line-height: 200px;
            opacity: 0.5;
            transform: rotate(35deg);
        }

        .confirm-enter-from {
            transform: scale(1);
        }

        .confirm-enter-active {
            transition: all .3s;
        }

        .confirm-enter-to {
            transform: scale(1.2);
        }
    }
}
</style>