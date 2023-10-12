export interface IResponseData {
    code: number
    message: string
    ok: boolean
}

/** 代表某一个账号下的就诊人信息TS类型约束 */
export interface IVisitorInfo {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: {
        certificatesTypeString: string
        contactsCertificatesTypeString: string
        cityString: null
        fullAddress: string
        districtString: null
        provinceString: null
    }
    userId: number
    name: string
    certificatesType: string
    certificatesNo: string
    sex: number
    birthdate: string
    phone: string
    isMarry: number
    provinceCode: null
    cityCode: null
    districtCode: null
    address: string
    contactsName: string
    contactsCertificatesType: string
    contactsCertificatesNo: string
    contactsPhone: string
    isInsure: number
    cardNo: null
    status: string
}

export type TVisitorArr = IVisitorInfo[];

export interface IVisitorInfoResponseData extends IResponseData {
    data: TVisitorArr
}

/** 创建订单接口数据类型约束 */
export interface ISubmitOrderResponseData extends IResponseData {
    data: number
}

/** 获取订单详情数据类型约束 */
export interface IOrderInfo {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        orderStatusString: string
    },
    userId: number,
    outTradeNo: string,
    hoscode: string,
    hosname: string,
    depcode: string,
    depname: string,
    scheduleId: string,
    title: string,
    reserveDate: string,
    reserveTime: number,
    patientId: number,
    patientName: string,
    patientPhone: string,
    hosRecordId: string,
    number: number,
    fetchTime: string,
    fetchAddress: string,
    amount: number,
    quitTime: string,
    orderStatus: number
}

export interface IGetOrderInfoResponseData extends IResponseData {
    data: IOrderInfo
}

/** 取消订单接口类型约束 */
export interface ICancelOrderResponseData extends IResponseData {
    data: boolean | null
}

/** 点击下单生成二维码类型约束  */
export interface IQrcodeInfo {
    codeUrl: string
    orderId: number
    totalFee: number
    resultCode: string
}

export interface IQrcodeResponseData extends IResponseData {
    data: IQrcodeInfo
}

/** 查询支付状态接口类型约束 */
export interface IPayStatusResponseData extends IResponseData {
    data: boolean
}

/** 订单信息表格类型约束 */
export interface IOrderTableRecord {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        orderStatusString: string
    },
    userId: number,
    outTradeNo: string,
    hoscode: string,
    hosname: string,
    depcode: string,
    depname: string,
    scheduleId: null,
    title: string,
    reserveDate: string,
    reserveTime: number,
    patientId: number,
    patientName: string,
    patientPhone: string,
    hosRecordId: string,
    number: number,
    fetchTime: string,
    fetchAddress: string,
    amount: number,
    quitTime: string,
    orderStatus: number
}

export type TOrderTableRecordsArr = IOrderTableRecord[];

export interface IOrderTableData {
    records: TOrderTableRecordsArr
    total:number
    size:number
    current:number
    orders:[]
    hitCount:boolean
    searchCount:boolean
    pages:number
}

export interface IOrderTableResponseData extends IResponseData {
    data: IOrderTableData
}

/** 获取所有就诊人信息接口类型约束 */
export type TPatientDataArr =  IVisitorInfo [];

export interface IPatientResponseData extends IResponseData {
    data: TPatientDataArr
}

/** 获取所有订单状态 */
export interface IAllOrderStateObject {
    comment: string
    status: number
}

export type TAllOrderStateArr = IAllOrderStateObject[];

export interface IAllOrderStateResponseData extends IResponseData {
    data: TAllOrderStateArr
}