// 本地化存储用户信息的方法
export const SET_TOKEN = (userInfo: string) => {
    return localStorage.setItem('UserInfo', userInfo);
} 

export const GET_TOKEN = () => {
    return localStorage.getItem('UserInfo');
}

export const REMOVE_TOKEN = () => {
    return localStorage.removeItem('UserInfo');
}