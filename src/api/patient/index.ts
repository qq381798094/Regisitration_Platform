// 引入二次封装
import request from '@/utils/request';
// 类型约束引用
import type { IAddOrUpdataPatient } from './type.ts';

enum API {
    // 新增就诊人接口
    ADD_PATIENT__URL = '/user/patient/auth/save',
    // 更新已有得就诊人接口
    UPDATA_PATIENT__URL = '/user/patient/auth/update',
    // 删除就诊人信息接口
    DELETE_PATIENT__URL = '/user/patient/auth/remove/',
}

// 新增和编辑就诊人接口数据
export const requestAddOrUpdatePatient = (data: IAddOrUpdataPatient) => {
    if(data.id) {
        // 修改接口
        return request.put<any, any>(API.UPDATA_PATIENT__URL, data);
    } else {
        // 新增接口
        return request.post<any, any>(API.ADD_PATIENT__URL, data);
    }
}

// 删除就诊人接口数据
export const requestDeletePatient = (id:number) => request.delete<any, any>(API.DELETE_PATIENT__URL + id);