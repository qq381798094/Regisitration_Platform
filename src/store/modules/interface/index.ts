import type { IHospitalDetail, IDepartmentArr } from '@/api/hospital/type';
import type { IUserInfo } from '@/api/user/types';


/**  仓库中整个 state 的类型约束 */
export interface IDetailState {
    hospitalInfo: IHospitalDetail
    hospitalInfoDeparmentArr: IDepartmentArr
}

export interface IUserState {
    loginVisible: boolean
    userInfo: IUserInfo
    code: string
}