
import {request} from "./request";

export function createOrderNow(data) {
    return request({
        url: '/order/create/now',
        data,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function createOrderByCart(cartId,addressId) {
    return request( {
        url: '/order/createOrder',
        params:{
            addressId
        },
        data: cartId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function UpdateOrderPayStatus(outTradeNo,tradeNo) {
    return request( {
        url: '/order/updateOrderPayStatus',
        params:{
            outTradeNo,
            tradeNo
        },
        method: "get",
    })
}


export function loadOrder() {
    return request( {
        url: '/order/getOrderByUser',
    })
}

export function getOrderByOid(oid) {
    return request( {
        url: '/order/getOrderByOid',
        params: {
            oid
        },
    })
}

export function cancleOrderByUser(orderId,orderDetailIdList) {
    return request( {
        url: '/order/cancleOrder',
        params:{
            orderId
        },
        data: orderDetailIdList,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}


