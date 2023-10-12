export interface IResponseData {
    code: number
    message: string
    ok: boolean
}

// 用户登录接口参数类型
export interface ILoginData {
    phone: string
    code: string
}

// 返回的用户信息类型约束
export interface IUserInfo {
    name: string
    token: string
}

// 登录接口返回的数据类型约束
export interface IUserLoginResponseData extends IResponseData {
    data: IUserInfo
}

/** 微信二维码返回的数据的类型约束 */
export interface IWxLogin {
    redirectUri: string
    appid: string
    scope: string
    state: string
}

export interface IWxLoginResponseData extends IResponseData {
    data: IWxLogin
}

/** 用户详细信息类型约束 */
export interface IUserDetailInfo {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: {}
    openid: null
    nickName: null
    phone: string
    name: string
    certificatesType: string
    certificatesNo: string
    certificatesUrl: null
    authStatus: number
    status: number
}

export interface IUserDetailInfoResponseData extends IResponseData {
    data: IUserDetailInfo
}

/** 获取证件类型数据的类型约束 */
export interface ICertificatesType {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean
}

export type TCertificatesTypeArr = ICertificatesType [];

export interface ICertificatesTypeResponseData extends IResponseData {
    data: TCertificatesTypeArr
}

/** 用户认证接口的类型约束 */
// 用户认证所需要携带的参数类型约束
export interface UserParams {
    certificatesNo: string
    certificatesType: string
    certificatesUrl: string
    name: string
}

/*** 定义城市数据接口的类型约束 */
export interface ICityDataObject {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    parentId: number,
    name: string,
    value: string,
    dictCode: null,
    hasChildren: boolean
}

export type TCityDataArr = ICityDataObject [];

export interface ICityDataResponseData extends IResponseData {
    data: TCityDataArr
}