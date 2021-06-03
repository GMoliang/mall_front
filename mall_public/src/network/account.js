
import {request} from "./request";

// 发送验证码
export function getCode(mobile){
    return request({
        url: '/captcha/sent',
        params: {
            mobile
        },
    })
}

// 验证验证码
export function CheckCaptcha(mobile, smsCode){
    return request({
        url: '/captcha/verify',
        params:{
            mobile,
            smsCode
        }
    })
}

//验证原密码是否正确
export function checkOldPwd(password) {
    return request({
        url: '/account/oldpass',
        params:{
            password
        }
    })
}

export function changePwd(formData) {
    return request({
        url: '/user/updatePassword',
        data:formData,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
