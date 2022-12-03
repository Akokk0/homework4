import axios from "axios";

// 创建axios实例
const request = axios.create({
    baseURL: 'http://akokko.com:20001',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 创建axios实例
export const goodsRequest = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 请求拦截
goodsRequest.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers!.token = localStorage.getItem('token') || ''
    }
    return config
})

// 响应拦截
goodsRequest.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    return err
})

export default request
