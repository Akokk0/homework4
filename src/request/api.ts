import request, {goodsRequest} from "@/request/index";
import {SignupDataInt} from "@/type/signup";
import {LoginDataInt} from "@/type/login";
import {ChangePwdDataInt} from "@/type/changePwd";
import {VerifyCPCode} from "@/type/verifyCPCode";
import {AddUser, EditUser} from "@/type/user";

// 注册
export function signUp(data: SignupDataInt) {
    return request({
        url: 'user/signUp',
        method: 'POST',
        data
    })
}

// 登录
export function login(data: LoginDataInt) {
    return request({
        url: 'user/login',
        method: 'POST',
        data
    })
}

export function activation(data: string) {
    return request({
        url: `user/activation/${data}`,
        method: 'GET'
    })
}

export function retrievePwd(data: string) {
    return request({
        url: 'user/retrievePwd',
        method: 'POST',
        data: {email: data}
    })
}

export function changePwd(data: ChangePwdDataInt) {
    return request({
        url: 'user/changePwd',
        method: 'POST',
        data
    })
}

export function verifyToken(data: string) {
    return request({
        url: 'user/verifyToken',
        method: 'POST',
        data: {cookie: data}
    })
}

export function verifyCPCode(data: VerifyCPCode) {
    return request({
        url: 'user/verifyCPCode',
        method: 'POST',
        data
    })
}

export function checkEmail(data: string) {
    return request({
        url: 'user/checkEmail',
        method: 'POST',
        data: {email: data}
    })
}

export function getGoodsList() {
    return goodsRequest({
        url: 'getGoodsList',
        method: 'GET'
    })
}

export function getAllUser() {
    return request({
        url: 'user/getAllUser',
        method: 'GET'
    })
}

export function addUser(data: AddUser) {
    return request({
        url: '/user/addUser',
        method: 'POST',
        data
    })
}

export function deleteUser(data: Number) {
    return request({
        url: `/user/deleteUser/${data}`,
        method: "DELETE"
    })
}

export function editUser(data: EditUser) {
    return request({
        url: 'user/editUser',
        method: 'POST',
        data
    })
}
