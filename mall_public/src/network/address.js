import {request} from "./request";

//保存地址
export function saveAddress(userId,address) {
    return request( {
        url: '/address/insertAddress',
        params:{
            userId
        },
        data: address,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

//得到用户地址
export function selectAddress(userId) {
    return request( {
        url: '/address/getAddressByUser',
        params:{
            userId
        },
        method: "get",
    })
}

//删除用户地址
export function deleteAddress(addressId) {
    return request( {
        url: '/address/deleteAddress',
        data:addressId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

