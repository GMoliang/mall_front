import {request} from "./request";

export function shopRegister(data) {
    return request({
        url: '/shop/registerShop',
        data,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
