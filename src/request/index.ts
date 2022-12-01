import axios from "axios";

// 创建axios实例
const request = axios.create({
    baseURL: 'http://localhost:20001',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/*// 请求拦截
request.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers!.token = localStorage.getItem('token') || ''
    }
    return config
})

// 响应拦截
request.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    return err
})*/

export default request
