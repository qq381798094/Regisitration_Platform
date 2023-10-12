// 详情页面类型约束

export interface IResponseData {
    code: number
    message: string
    ok: boolean
}

// 医院详情数据类型约束
export interface IHospitalDetail {
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    },
    hospital: {
        id: string,
        createTime: string,
        updateTime: string ,
        isDeleted: number,
        param: {
            hostypeString: string,
            fullAddress: string
        },
        hoscode: string,
        hosname: string,
        hostype: string,
        provinceCode: string,
        cityCode: string,
        districtCode: string,
        address: string,
        logoData: string
        intro: string,
        route: string,
        status: number,
        bookingRule: boolean
    }
}

// 医院详情接口返回数据的TS类型约束
export interface IHospitalDetailData extends IResponseData {
    data: IHospitalDetail
}



// 医院详情科室类型约束
export interface IDepartment {
    depcode: string,
    depname: string,
    children?: IDepartment[] 
}

// 存储科室数组类型
export type IDepartmentArr = IDepartment[];

// 获取科室接口的数据类型约束
export interface IDepartmentResponseData extends IResponseData {
    data: IDepartmentArr
}

/* 医院小科室预约挂号详情页类型约束 */
export interface IBaseMap {
    workDateString: string
    releaseTime: string
    bigname: string
    stopTime: string
    depname: string
    hosname: string
}

export interface IWorkData {
    workDate: string
    workDateMd: string
    dayOfWeek: string
    docCount: number
    reservedNumber: null
    availableNumber: number
    status: number
}
export type BookingScheduleList = IWorkData[];

export interface IHospitalWorkData {
    total: number
    bookingScheduleList: BookingScheduleList
    baseMap: IBaseMap
}

export interface IHospitalWorkResponseData extends IResponseData {
    data: IHospitalWorkData
}

/** 小科室门诊排班数据类型约束 */
export interface IDoctorOrderData {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        dayOfWeek: string
        depname: string,
        hosname: string
    },
    hoscode: string
    depcode: string
    title: string
    docname: string
    skill: string
    workDate: string
    workTime: number
    reservedNumber: number
    availableNumber: number
    amount: number
    status: number
    hosScheduleId: string
}

export type TDoctorOrderArr = IDoctorOrderData[];

export interface IDoctorOrderResponseData extends IResponseData {
    data: TDoctorOrderArr
}

/**获取医生排班数据的类型约束 */
export interface IDoctorInfoResponseData extends IResponseData {
    data: IDoctorOrderData
}