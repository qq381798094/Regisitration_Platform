// 引入二次封装
import request from '@/utils/request';
// 类型约束引用
import type { ILoginData, IUserLoginResponseData, 
            IWxLoginResponseData, IUserDetailInfoResponseData, 
            ICertificatesTypeResponseData, UserParams, ICityDataResponseData } from './types';

// 枚举请求类型
enum API {
    // 用户输入手机号码后需要得到的短信验证码数据
    USER_LOGIN_CODE__URL = "/sms/send/",
    // 用户登录接口
    USER_LOGIN__URL = "/user/login",
    // 用户微信扫码登录接口
    USER_WECHAT_LOGIN__URL = '/user/weixin/getLoginParam/',
    // 获取当前的用户信息接口
    GET_USER_INFO__URL = '/user/auth/getUserInfo',
    // 获取证件类型的接口
    CERTIFICATE_TYPE__URL = '/cmn/dict/findByDictCode/',
    // 用户认证接口
    USER_CERTIFICATE__URL = '/user/auth/userAuah',
    // 获取城市数据接口
    GET_CITY_DATA__URL = '/cmn/dict/findByParentId/',
}

// 获取短信验证码
export const requestUserLoginCode = (phone: string) => request.get<any, any>(API.USER_LOGIN_CODE__URL + phone);

// 用户登录接口
export const requestUserLogin = (data: ILoginData) => request.post<any, IUserLoginResponseData>(API.USER_LOGIN__URL, data);

// 用户微信扫码登录接口【生成二维码】
export const requestWxLogin = (wxRedirectUri: string) => request.get<any, IWxLoginResponseData>(API.USER_WECHAT_LOGIN__URL + `?wxRedirectUri=${wxRedirectUri}`);

// 获取当前的用户信息接口
export const requestUserInfo = () => request.get<any, IUserDetailInfoResponseData>(API.GET_USER_INFO__URL);

// 获取证件类型的接口
export const requestCertificateType = (dictCode: string = 'certificatesType') => request.get<any, ICertificatesTypeResponseData>(API.CERTIFICATE_TYPE__URL + dictCode);

// 用户认证接口
export const requestUserCertificate = (data: UserParams) => request.post<any, any>(API.USER_CERTIFICATE__URL, data);

// 获取城市数据接口
export const requestCityData = (parentId: number) => request.get<any, ICityDataResponseData>(API.GET_CITY_DATA__URL + parentId);
