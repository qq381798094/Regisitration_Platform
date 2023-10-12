// 共同拥有的请求体
export interface IResponseData {
    code: number
    message: string
    ok: boolean
}

/** 就诊人信息新增或者编辑需要提交到接口数据的data类型约束 */
export interface IAddOrUpdataPatient {
    id?: number
    name: string
    certificatesType: string
    certificatesNo: string
    sex: number
    birthdate: string
    phone: string
    isMarry: number
    isInsure: number
    addressSelected: string[]
    address: string
    contactsName: string
    contactsCertificatesType: string
    contactsCertificatesNo: string
    contactsPhone: string
}