// 定义一个仓库
import { defineStore } from 'pinia';
// 引入接口
import { requestHospitalDetail, requestHospitalDepartment } from '@/api/hospital';
// 引入类型
import type { IHospitalDetailData, IHospitalDetail, IDepartmentResponseData } from '@/api/hospital/type';
import type { IDetailState } from './interface';

const hospitalDetailStore = defineStore('Detail', {
    state: (): IDetailState => {
        return {
            hospitalInfo: ( {} as IHospitalDetail),   //医院详情的数据
            hospitalInfoDeparmentArr: [],   // 医院详情的科室数据
        }
    },
    actions: {
        // 获取医院详情方法
        async getHospitalDetail(hoscode: string) {
            const res: IHospitalDetailData = await requestHospitalDetail(hoscode)
            if( res.code === 200) {
                this.hospitalInfo = res.data;
            }
        },
        // 获取医院详情中的科室数据方法
        async getHospitalDetailDepartment(hoscode: string) {
            const res:IDepartmentResponseData = await requestHospitalDepartment(hoscode);
            if( res.code === 200) {
                this.hospitalInfoDeparmentArr = res.data;
            }
        }
    },
    getters: {

    }
})

export default hospitalDetailStore;