import request from "@/request/index";
import {SignupDataInt} from "@/type/signup";
import {LoginDataInt} from "@/type/login";
import {ChangePwdDataInt} from "@/type/changePwd";

// 注册
export function signUp(data: SignupDataInt) {
    return request({
        url: 'signUp',
        method: 'POST',
        data
    })
}

// 登录
export function login(data: LoginDataInt) {
    return request({
        url: 'login',
        method: 'POST',
        data
    })
}

export function activation(data: string) {
    return request({
        url: `activation/${data}`,
        method: 'GET'
    })
}

export function retrievePwd(data: string) {
    return request({
        url: 'retrievePwd',
        method: 'POST',
        data: {email: data}
    })
}

export function changePwd(data: ChangePwdDataInt) {
    return request({
        url: 'changePwd',
        method: 'POST',
        data
    })
}

export function verifyToken(data: string) {
    return request({
        url: 'verifyToken',
        method: 'GET',
        data: {name: null, cookie: data}
    })
}
