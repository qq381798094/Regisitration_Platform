// 首页接口统一管理
import request from '@/utils/request';
// 引入类型
import type { IHospitalResponseData, HospitalLevelAndRegionResponseData, IHospitalInfo } from './type';
// 使用枚举管理首页模块接口
enum API {
    // 获取医院列表数据
    HOSPITAL_URL = '/hosp/hospital/',
    // 获取医院等级与地区
    HOSPITAL_LEVEL_AND_REGION_URL = '/cmn/dict/findByDictCode/',
    // 通过关键字模糊搜索返回的数据
    HOSPITAL_INFO_URL = '/hosp/hospital/findByHosname/',
}

// 获取医院列表数据
export const requestHospital = (page: number, limit: number, hostype: string = '', districtCode: string = '') => request.get<any, IHospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

// 获取医院等级 || 获取医院区域 数据
export const requestHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITAL_LEVEL_AND_REGION_URL + dictCode);

// 模糊搜索返回数据 ———— 需要参数
export const requestHospitalInfo = (hosname: string) => request.get<any, IHospitalInfo>(API.HOSPITAL_INFO_URL + hosname);