

import {request} from "./request";

// 查询手机号是否注册
export function checkPhone(phone){
    return request({
        url: '/user/phone/check',
        params:{
            phone
        }
    })
}

// 查询用户名是否注册
export function checkUsername(username){
    return request({
        url: '/user/member/check',
        params:{
            username
        }
    })
}

//用户注册
export function userRegister(username, pwd, tell){
    return request({
        url: '/user/register',
        data:{
            username: username,
            password: pwd,
            mobile: tell
        },
        method: 'post',
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

