// 二次封装
import request from '@/utils/request';
// 类型引入
import type { IVisitorInfoResponseData, ISubmitOrderResponseData, 
            IGetOrderInfoResponseData, ICancelOrderResponseData, 
            IQrcodeResponseData, IPayStatusResponseData,
            IOrderTableResponseData, IPatientResponseData,
            IAllOrderStateResponseData } from './type.ts';

enum API {
    // 获取某一个账号下就诊人的信息
    GET_VISITOR__URL = '/user/patient/auth/findAll',
    // 提交订单的接口
    SUBMIT_ORDER__URL = '/order/orderInfo/auth/submitOrder/',
    // 获取当前订单详情的接口
    GET_ORDER_INFO__URL = '/order/orderInfo/auth/getOrderInfo/',
    // 取消预约当前订单接口
    CANCEL_ORDER__URL = '/order/orderInfo/auth/cancelOrder/',
    // 点击下单生成二维码接口
    CREATE_ORDER_QRCODE__URL = '/order/weixin/createNative/',
    // 查询支付状态接口
    QUERY_PAY_STATUS__URL = '/order/weixin/queryPayStatus/',
    // 根据页数和数据量获取分页列表
    ORDER_DATA_PAGE__URL = '/order/orderInfo/auth/',
    // 获取所有就诊人信息
    GET_ALL_PATIENT__URL = '/user/patient/auth/findAll',
    // 获取所有订单状态
    GET_ALL_ORDER_STATE__URL = '/order/orderInfo/auth/getStatusList',
}

// 获取某一个账号下就诊人信息
export const requestGetVisitor = () => request.get<any, IVisitorInfoResponseData>(API.GET_VISITOR__URL);

// 提交订单的接口
export const requestSubmitOrder = (hoscode:string, scheduleId:string, patientId:number) => request.post<any, ISubmitOrderResponseData>(API.SUBMIT_ORDER__URL + `${hoscode}/${scheduleId}/${patientId}`);

// 获取当前订单详情的接口
export const requestGetOrderInfo = (id: string) => request.get<any, IGetOrderInfoResponseData>(API.GET_ORDER_INFO__URL + id);

// 取消预约当前订单接口
export const requestCancelOrder = (orderId: string) => request.get<any, ICancelOrderResponseData>(API.CANCEL_ORDER__URL + orderId);

// 点击下单生成二维码接口
export const requestQrcode = (orderId: string) => request.get<any, IQrcodeResponseData>(API.CREATE_ORDER_QRCODE__URL + orderId)

// 查询支付状态接口
export const requestPayStatus = (orderId: string) => request.get<any, IPayStatusResponseData>(API.QUERY_PAY_STATUS__URL + orderId);

// 根据页数和数据量获取分页列表
export const requestPageOrder = (page: number, limit:number, patientId:string, orderStatus:string) => request.get<any, IOrderTableResponseData>(API.ORDER_DATA_PAGE__URL + `/${page}/${limit}/?patientId=${patientId}&orderStatus=${orderStatus}`);

// 获取所有就诊人信息
export const requestAllPatient = () => request.get<any, IPatientResponseData>(API.GET_ALL_PATIENT__URL);

// 获取所有订单状态
export const requestAllOrderState = () => request.get<any, IAllOrderStateResponseData>(API.GET_ALL_ORDER_STATE__URL);
