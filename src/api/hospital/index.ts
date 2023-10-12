// 引入二次封装
import request from '@/utils/request';
// 引入类型
import type { IHospitalDetailData, IDepartmentResponseData, IHospitalWorkResponseData, IDoctorOrderResponseData, IDoctorInfoResponseData } from './type';

// 枚举请求类型
enum API {
    // 医院详情API
    HOSPITAL_DETAIL__URL = "/hosp/hospital/",
    // 医院详情中的科室API
    HOSPITAL_DEPARTMENT__URL = '/hosp/hospital/department/',
    // 小科室的预约挂号详情接口
    HOSPITAL_WORK__URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 根据小科室名称所返回的排班数据接口
    HOSPITAL_DOCTOR_ORDER__URL = '/hosp/hospital/auth/findScheduleList/',
    // 根据排班id获取排班数据
    GET_DOCTOR_SCHEDULE__URL = '/hosp/hospital/getSchedule/'
}

// 获取医院详情接口
export const requestHospitalDetail = (hoscode: string) => request.get<any, IHospitalDetailData>(API.HOSPITAL_DETAIL__URL + hoscode);

// 获取医院详情中的科室数据接口
export const requestHospitalDepartment = (hoscode: string) => request.get<any, IDepartmentResponseData>(API.HOSPITAL_DEPARTMENT__URL + hoscode);

// 获取小科室的预约挂号详情接口
export const requestHospitalWork = (page:number, limit:number, hoscode:string, depcode:string) => request.get<any, IHospitalWorkResponseData>(API.HOSPITAL_WORK__URL + `${page}/${limit}/${hoscode}/${depcode}`);

// 获取小科室名称所返回的排班数据接口
export const requestHospitalDoctorOrder = (hoscode:string, depcode:string, workDate:string) => request.get<any, IDoctorOrderResponseData>(API.HOSPITAL_DOCTOR_ORDER__URL + `${hoscode}/${depcode}/${workDate}`);

// 根据排班id获取排班数据的请求接口
export const requestDoctorSchedule = (scheduleId: string) => request.get<any, IDoctorInfoResponseData>(API.GET_DOCTOR_SCHEDULE__URL + scheduleId);
